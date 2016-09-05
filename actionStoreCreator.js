import {unique} from './tools';
import storeCreate from './storeCreator';
import actionCreate from './actionCreator';

export default function actionStoreCreate(actionCreators, method, handlers, storeId = unique()){
	return {
		actionor: actionCreate(storeId, actionCreators),
		storeor: storeCreate(storeId, method, handlers)
	}
}