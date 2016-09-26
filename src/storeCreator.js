var Fluder = require('./fluder')
/**
 * Thanks to
 * https://github.com/Gozala/events
 */
var EventEmitter = require('events')
var unique = require('./tools').unique
var getType = require('./tools').getType
  /**
   * create store[export API]
   * @param  {string} actions  store need the actions to change
   * as actionStoreCreate entering, the actions is storeId which is a string.
   * @param  {object} method   store state getter
   * @param  {object} handlers action sending
   * @return {object}          return a store instance
   */
function storeCreate (actions, method, handlers) {
  var storeId = typeof actions === 'object'
    ? unique()
    : actions
  /**
   * storeId is required
   */
  if (typeof storeId === 'undefined') {
    throw Error('id is reauired as create a store, and the id is the same of store!')
  }
  var CHANGE_EVENT = 'change'
  /**
   * create store extend Emitter
   */
  var store = Object.assign(method, EventEmitter.prototype, {
    /**
     * store change API(Emitter API)
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
  /**
   * added storeId in actions
   */
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
