// import {actionCreate} from 'fluder';
import {actionCreate} from '../../../../src';
import constants from '../constants'
export default actionCreate({
	addTodo:(item)=>({
		type: constants.ADD_TODO,
		value: item
	}),
  delTodo:(i)=>({
		type: constants.DEL_TODO,
		value: i
	}),
  toggleState:(i, key)=>({
		type: constants.TOGGLE_TODO,
		value: i,
    key: key
	}),
  localStorage:(itemStringify)=>({
		type: constants.LOCAL_STORAGE,
		value: itemStringify
	}),
});
