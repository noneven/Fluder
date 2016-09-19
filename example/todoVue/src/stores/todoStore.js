import {
  applyMiddleware,
  actionCreate,
  storeCreate
} from 'fluder';

import Fluder from 'fluder';
console.log(Fluder)
import constants from '../constants'
import * as LocalStore from '../localStore/store';

/**
 * 中间件引入
 */
applyMiddleware((data, next)=>{
  let {storeId, payload} = data;
	console.info(`actionType: \"${payload.type}\"`);
	console.info(`storeId: \"${storeId}\"`);
  console.log(payload);
  console.log('--------------------------------');
  next();
})

const TODOAPP_ID = "TODOAPP";
let items = LocalStore.get(TODOAPP_ID)||[];

export default storeCreate(TODOAPP_ID,{
  /**
   * store只提供读权限
   */
  getAll: function(){
    return items
  }
},{
  /**
   * handler提供读写权限
   */
  [`${TODOAPP_ID}/${constants.ADD_TODO}`]: function(payload){
    push(payload.value)
    return items
  },
  [`${TODOAPP_ID}/${constants.DEL_TODO}`]: function(payload){
    del(payload.value)
    return items
  },
  [`${TODOAPP_ID}/${constants.TOGGLE_TODO}`]: function(payload){
    toggle(payload.value, payload.key)
    return items
  },
  [`${TODOAPP_ID}/${constants.LOCAL_STORAGE}`]: function(payload){
    save(payload.value)
    return items
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
  LocalStore.set(TODOAPP_ID, itemStringify)
}
