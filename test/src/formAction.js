var actionCreate = require('../../src/actionCreator')
var constants = require('./constants')
const FORM_ID = 'FORMID'

module.exports = actionCreate({
  pushKey: (key) => ({
    type: `${FORM_ID}/${constants.PUSH_KEYS}`,
    value: key
  }),
  pushValue: (val) => ({
    type: `${FORM_ID}/${constants.PUSH_VALUES}`,
    value: val
  }),
  noTypeAction: (val) => ({
    value: val
  }),
  functionTypeAction: fn => fn
})
