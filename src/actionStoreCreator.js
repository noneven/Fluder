var Tool = require('./tools')
var unique = Tool.unique
var storeCreate = require('./storeCreator')
var actionCreate = require('./actionCreator')
/**
 * actionStoreCreate [export API]
 * generator the actionor and storeor conveniently,
 * enter the actionCreate and storeCreate require a storeId
 * with arguments or unique return.
 *
 * @param  {object} actionCreators [generate action with the object]
 * @param  {object} method         [store get the store data API]
 * @param  {object} handlers       [handle the store action type]
 * @param  {object} storeId        [not required, if no unique return]
 * @return {object}                [actionor and storeor]
 */
function actionStoreCreate (actionCreators, method, handlers, storeId) {
  storeId = (storeId || unique())
  return {
    actionor: actionCreate(actionCreators, storeId),
    storeor: storeCreate(storeId, method, handlers)
  }
}

module.exports = actionStoreCreate
