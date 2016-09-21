
var actionCreate = require('../../src/actionCreator');
var constants = require('./constants');
const TODOAPP_ID = "TODOAPP";

module.exports = actionCreate(TODOAPP_ID,{
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
	})
});
