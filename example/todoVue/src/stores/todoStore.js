// import {applyMiddleware,storeCreate} from 'fluder';
import {applyMiddleware,storeCreate} from '../../../../src';

import constants from '../constants'
import todoAction from '../actions/todoAction'
import * as LocalStore from '../localStore/store';

/**
 * 中间件引入
 */
applyMiddleware((acrion, next)=>{
  //loggor
  let {storeId, payload, store} = acrion;
	console.info(`actionType: \"${payload.type}\"`);
	console.info(`storeId: \"${storeId}\"`);
  console.log(`payload: ${JSON.stringify(payload)}`);
  next();
  console.log('--------------------------------');
}).applyMiddleware((acrion, next)=>{
  //trunk
  let {storeId, payload} = acrion;
  typeof payload == "function"
    ? payload()
    : next()
})

let items = LocalStore.get('TODOAPP_ID')||[];
let mobile = '';
export default storeCreate(todoAction,{
  /**
   * store只提供读权限
   */
  getAll: function(){
    return items
  },
  getMobile: function(){
    return mobile
  }
},{
  /**
   * handler提供读写权限
   */
  [constants.ADD_TODO]: function(payload){
    push(payload.value)
    return items
  },
  [constants.DEL_TODO]: function(payload){
    del(payload.value)
    return items
  },
  [constants.TOGGLE_TODO]: function(payload){
    toggle(payload.value, payload.key)
    return items
  },
  [constants.LOCAL_STORAGE]: function(payload){
    save(payload.value)
    return items
  },
  [constants.AJAX_USER_STATE]: function(payload){
    setMobile(payload.value)
    return mobile
  }
})

/**
 * 写权限API
 */
function push(item){
  items.push(item)
}
function del(i){
  items.splice(i,1)
}
function toggle(i, key){
  items[i][key] = !items[i][key]
}
function save(itemStringify){
  LocalStore.set("TODOAPP_ID", itemStringify)
}
function setMobile(m){
  mobile = m
}
