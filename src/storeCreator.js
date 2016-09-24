var Fluder = require('./fluder')
var EventEmitter = require('events')
var unique = require('./tools').unique
var getType = require('./tools').getType
  /**
   * 创建store[对外API]
   * @param  {string} storeId  该store的唯一标识，和action里的storeId一一对应
   * @param  {object} method   操作store的api(一般提供get set del update等)
   * @param  {object} handlers action的处理回调对象，handler的key需要和actionType一致
   * @return {object}          返回store对象
   */
function storeCreate (actions, method, handlers) {
  var storeId = typeof actions === 'object'
    ? unique()
    : actions
  /**
   * 不存在storeId
   */
  if (typeof storeId === 'undefined') {
    throw Error('id is reauired as create a store, and the id is the same of store!')
  }
  var CHANGE_EVENT = 'change'
  /**
   * 创建store，继承EventEmitter
   */
  var store = Object.assign(method, EventEmitter.prototype, {
    /**
     * 统一Store的EventEmitter调用方式，避免和全局EventEmitter混淆
     * 这里把payload传给change的Store，可以做相应的渲染优化[局部渲染]
     * 这里的局部优化是指全局Stores更新，触发的Store Handler较多，可以通过payload的数据过滤
     */
    emitChange: function (payload, result) {
      this.emit(CHANGE_EVENT, payload, result)
    },
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback)
    },
    removeAllChangeListener: function () {
      this.removeAllListeners()
    }
  })
  var definePropertyArray = getType(actions) === 'array'
    ? actions
    : typeof actions === 'object'
        ? [actions]
        : []
  definePropertyArray.length && definePropertyArray.map(function (action) {
    Object.defineProperty(action, '__id__', {
      value: storeId,
      writable: false,
      enumerable: false,
      configurable: false
    })
  })
  Fluder.register(storeId, {
    store: store,
    handlers: handlers
  })

  return store
}

module.exports = storeCreate
