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
 * constructor
 * @return {object} - the Fluder object
 */
function Fluder () {
  /**
   * store handlers register map
   * @type {Object}
   */
  this._registers = {}

  /**
   * dispatch stack
   * @type {Array}
   */
  this._dispatchStack = []

  /**
   * init
   */
  this._init()
}

Fluder.prototype._init = function () {
  /**
   * init middleware to handle the action
   */
  this._middleware = new Queue(true).after(function (payload) {
    /**
     * after middleware finished will invoke store handler
     */
    this._invoke(payload)
  }.bind(this))
}

/**
 * action invoke store change
 * this payload contain the storeId、the action payload and the store
 *
 * @param  {object} payload - storeId/payload/store
 * @return {void}           - return null
 */
Fluder.prototype._invoke = function (payload) {
  /**
   * storeId: map the register store
   * @type {string}
   */
  var storeId = payload.storeId

  /**
   * store and the store handlers
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
   * map handler in handlers with actionType
   * @type {string}
   */
  var handler = handlers[payload.type]

  if (typeof handler === 'function') {
    /**
     * TODO
     * result should be the store-state copy
     * the state is immutable datastructures will be better
     *
     * view-controller[Vue/React components] can't revise the store state
     */

    var result
    // var _result = handler.call(store, payload)
    /**
     * the result is not required, only set store state
     * payload to store change callback to render optimization and local rending
     */
    handler.call(store, payload)
    // if (result !== undefined)
    store.emitChange(payload, result)
  }
}

/**
 * start dispatch to update the stack[push storeId]
 * and record the current dispatch storeId
 */
Fluder.prototype._startDispatch = function (storeId) {
  this._dispatchStack || (this._dispatchStack = [])
  this._dispatchStack.push(storeId)
  this._currentDispatch = storeId
}

/**
 * handler finished to update the stack[pop stack]
 * and delete the current dispatch
 */
Fluder.prototype._endDispatch = function () {
  this._dispatchStack.pop()
  this._currentDispatch = null
}

/**
 * store and handler register
 * @param  {string} storeId - store/action unique
 * @param  {object} storeHandler  - store/handler collection
 * @return {void}   - return null
 */
Fluder.prototype.register = function (storeId, storeHandler) {
  this._registers[storeId] = storeHandler
}

/**
 * middleware queue
 * @param  {function} middleware - middleware handle function
 * @return {void}     - return null
 */
Fluder.prototype.enqueue = function (middleware) {
  this._middleware.enqueue(middleware)
}

/**
 * dispatch action
 * @param  {string} storeId - store/action unique
 * @param  {object} action  - action data
 * @return {void}           - return null
 */
Fluder.prototype.dispatch = function (storeId, payload) {
  /**
   * in current action invoke the store change sending the same action
   * which bring about the iteration of A-A, it will mack stackoverflow
   */
  if (this._currentDispatch === storeId) {
    throw Error('action ' + (payload.value && payload.value.actionType) + ' __invoke__ myself!')
  }

  /**
   * in current action invoke the store change
   * sending the action in dispatch stack which bring about
   * the iteration of A-B-A/A-B-C-A, it will also mack stackoverflow
   */
  if (this._dispatchStack.indexOf(storeId) !== -1) {
    throw Error(this._dispatchStack.join(' -> ') + storeId + ' : action __invoke__ to a circle!')
  }

  this._startDispatch(storeId)

  /**
   * actionType in action required，because the actionType
   * will be connect the store handler
   */
  if (typeof payload === 'object' && !payload.type) {
    throw new Error('action type does not exist in \n' + JSON.stringify(payload, null, 2))
  }

  try {
    /**
     * action sending will enter the Middleware
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
     * handler execute error, end current dispatch
     * for not blocking the process
     */
    this._endDispatch()

    /**
     * catch the error
     * you can use catchError middleware to handle
     */
    catchError(e)
  }

  this._endDispatch()
}

module.exports = new Fluder()
