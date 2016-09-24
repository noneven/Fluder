var storeCreate = require('../../src/storeCreator')
var constants = require('./constants')
const FORM_ID = 'FORMID'
const formAction = require('./formAction')
let keys = []
let values = []

module.exports = storeCreate(formAction, {
  /**
   * store只提供读权限
   */
  getAll: function () {
    return [keys, values]
  }
}, {
  /**
   * handler提供读写权限
   */
  [`${FORM_ID}/${constants.PUSH_KEYS}`]: function (payload) {
    pushKey(payload.value)
    return keys
  },
  [`${FORM_ID}/${constants.PUSH_VALUES}`]: function (payload) {
    pushValue(payload.value)
    return values
  }
})

/**
 * 写权限API
 */
function pushKey (item) {
  keys.push(item)
}

function pushValue(item) {
  values.push(item)
}
