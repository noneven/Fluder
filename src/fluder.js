/**
 * Fluder 0.1.0
 * A unidirectional data flow tool based on flux.
 *
 * url: https://github.com/coderwin/Fluder
 * author: chenjiancj2011@outlook.com
 * weibo: imChenJian
 * date: 2016-08-10
 */

/**
 * workflow Queue
 */
var Queue = require('./queue')

/**
 * catchError
 */
var Tool = require('./tools')
var catchError = Tool.catchError

/**
 * 构造函数
 * @return {object} 返回Fluder实例对象
 */
function Fluder () {
  /**
   * store handlers 注册Map
   * @type {Object}
   */
  this._registers = {}

  /**
   * dispatch栈
   * @type {Array}
   */
  this._dispatchStack = []

  /**
   * 初始化
   */
  this._init()
}

Fluder.prototype._init = function () {
  /**
   * 中间件，集中处理action payload和storeId
   */
  this._middleware = new Queue(true).after(function (payload) {
    /**
     * 中间件队列执行完后触发Store handler的调用
     */
    this._invoke(payload)
  }.bind(this))
}

/**
 * action对handler的调用(内部调用)
 * @param  {object} payload 此时的payload包含action和action对应的storeId
 * @return {void}           无返回值
 */
Fluder.prototype._invoke = function (payload) {
  /**
   * storeId: 用于map到register里面注册的handler
   * @type {string}
   */
  var storeId = payload.storeId

  /**
   * store和它对应的handler
   * @type {object}
   */
  var store = this._registers[storeId]['store']
  var handlers = this._registers[storeId]['handlers']

  /**
   * action payload
   * @type {object}
   */
  payload = payload.payload

  /**
   * 在当前storeId的store Map到对应的handler
   * @type {function}
   */
  var handler = handlers[payload.type]

  if (typeof handler === 'function') {
    /**
     * TODO
     * result应该为store数据的copy，暂时没做深度copy，后续把Store改写成Immutable数据结构
     * view-controller里面对result的修改不会影响到store里的数据
     */
    var result
      // var _result = handler.call(store, payload)
    handler.call(store, payload)
      /**
       * 可以没有返回值，只是set Store里面的值
       * 这里把payload传给change的Store，可以做相应的渲染优化[局部渲染]
       */
      // if (result !== undefined) {
    store.emitChange(payload, result)
      // }
  }
}

/**
 * 更新Action栈以及记录当前ActionID
 */
Fluder.prototype._startDispatch = function (storeId) {
  this._dispatchStack || (this._dispatchStack = [])
  this._dispatchStack.push(storeId)
  this._currentDispatch = storeId
}

/**
 * Action执行完更新Action栈以及删除当前ActionID
 */
Fluder.prototype._endDispatch = function () {
  this._dispatchStack.pop()
  this._currentDispatch = null
}

/**
 * Store和handler注册
 * @param  {string} storeId store/action唯一标示
 * @param  {object} storeHandler  store和handler
 * @return {void}           无返回值
 */
Fluder.prototype.register = function (storeId, storeHandler) {
  this._registers[storeId] = storeHandler
}

/**
 * 中间件入队
 * @param  {function} middleware  中间件处理函数
 * @return {void}           无返回值
 */
Fluder.prototype.enqueue = function (middleware) {
  this._middleware.enqueue(middleware)
}

/**
 * 触发action(内部调用)
 * @param  {string} storeId store/action唯一标示
 * @param  {object} action  action数据
 * @return {void}           无返回值
 */
Fluder.prototype.dispatch = function (storeId, payload) {
  /**
   * 在当前Action触发的Store handler回调函数中再次发起了当前Action，这样会造成A-A循环调用,出现栈溢出
   */
  if (this._currentDispatch === storeId) {
    throw Error('action ' + (payload.value && payload.value.actionType) + ' __invoke__ myself!')
  }

  /**
   * 在当前Action触发的Store handler回调函数中再次触发了当前Action栈中的Action，出现A-B-C-A式循环调用，也会出现栈溢出
   */
  if (this._dispatchStack.indexOf(storeId) !== -1) {
    throw Error(this._dispatchStack.join(' -> ') + storeId + ' : action __invoke__ to a circle!')
  }

  /**
   * 更新Action栈以及记录当前ActionID
   */
  this._startDispatch(storeId)

  /**
   * Action的触发必须有ActionType，原因是ActionType和Store handlers Map的key一一对应
   */
  if (!payload.type) {
    throw new Error('action type does not exist in \n' + JSON.stringify(payload, null, 2))
  }

  try {
    /**
     * 发出action的时候 统一走一遍中间件
     *
     * {
     *     storeId,
     *     payload
     * }
     *
     * shallow Immutable
     */
    this._middleware.execute(Object.freeze({
      storeId: storeId,
      payload: payload,
      store: this._registers[storeId]['store']
    }))
  } catch (e) {
    /**
     * 执行handler的时候出错end掉当前dispatch
     */
    this._endDispatch()

    /**
     * 抛出错误信息
     */
    catchError(e)
  }

  /**
   * Action执行完更新Action栈以及删除当前ActionID
   */
  this._endDispatch()
}

module.exports = new Fluder()
