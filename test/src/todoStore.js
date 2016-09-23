var storeCreate = require('../../src/storeCreator')
var constants = require('./constants')
const TODOAPP_ID = 'TODOAPP'
var items = []
module.exports = storeCreate(TODOAPP_ID, {
  /**
   * store只提供读权限
   */
  getAll: function () {
    return items
  }
}, {
  /**
   * handler提供读写权限
   */
  [`${TODOAPP_ID}/${constants.ADD_TODO}`]: function (payload) {
    push(payload.value)
    return items
  },
  [`${TODOAPP_ID}/${constants.DEL_TODO}`]: function (payload) {
    del(payload.value)
    return items
  },
  [`${TODOAPP_ID}/${constants.TOGGLE_TODO}`]: function (payload) {
    toggle(payload.value, payload.key)
    return items
  }
})

/**
 * 写权限API
 */
function push (item) {
  items.push(item)
}

function del (i) {
  items.splice(i, 1)
}

function toggle (i, key) {
  items[i][key] = !items[i][key]
}
