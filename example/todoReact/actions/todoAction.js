import {actionCreate} from '../../../src';

import constants from '../constants/constants';
const TODOID = constants.TODO_STORE_ID;
export default actionCreate(TODOID,{
	getAll:()=>({
		type: `${TODOID}/${constants.GET_ALL}`,
	}),
	delAll:()=>({
		type: `${TODOID}/${constants.DEL_ALL}`,
	}),
	addTodo:(addTodoV)=>({
		type: `${TODOID}/${constants.ADD_TODO}`,
		value: addTodoV,
	}),
	delTodo:(value)=>({
		type: `${TODOID}/${constants.DEL_TODO}`,
		value
	}),
	updateTodo:(updateTodoV,i)=>({
		type: `${TODOID}/${constants.UPDATE_TODO}`,
		value: updateTodoV,
        extParam: i,
	}),
	prevTodo:(i)=>({
		type: `${TODOID}/${constants.PREV_TODO}`,
		value: i
	})
});
