import {
  applyMiddleware,
  actionCreate,
  storeCreate
} from 'fluder';
import constants from '../constants'

const TODOAPP_ID = "TODOAPP";
export default actionCreate(TODOAPP_ID,{
	addTodo:(item)=>({
		type: `${TODOAPP_ID}/${constants.ADD_TODO}`,
		value: item
	}),
  delTodo:(i)=>({
		type: `${TODOAPP_ID}/${constants.DEL_TODO}`,
		value: i
	}),
  toggleState:(i, key)=>({
		type: `${TODOAPP_ID}/${constants.TOGGLE_TODO}`,
		value: i,
    key: key
	}),
  localStorage:(itemStringify)=>({
		type: `${TODOAPP_ID}/${constants.LOCAL_STORAGE}`,
		value: itemStringify
	})
});
