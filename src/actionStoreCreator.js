var Tool = require('./tools');
var unique = Tool.unique;
var storeCreate = require('./storeCreator');
var actionCreate = require('./actionCreator');

function actionStoreCreate(actionCreators, method, handlers, storeId){
	storeId = (storeId||unique());
	return {
		actionor: actionCreate(storeId, actionCreators),
		storeor: storeCreate(storeId, method, handlers)
	}
}

module.exports = actionStoreCreate;
