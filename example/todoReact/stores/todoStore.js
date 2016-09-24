/**
 * STORE部分
 */
import {storeCreate,actionStoreCreate} from '../../../src'

/**
 * 启用中间件
 */
import applyMiddleware from '../dispatcher'
import constants from '../constants/constants';
import todoAction from '../actions/todoAction';

//命名空间，可以没有
var TODOID = constants.TODO_STORE_ID;
/**
 * store数据(states)存储
 */
let items = function(){
    var TODOAPP = localStorage.getItem('TODOAPP');
    return TODOAPP?JSON.parse(TODOAPP):[];
}();
/**
 * store不提供set操作，只能在handler里面做set
 */
let API = {
    set: function(item){
        items.push({text:item});
        this.storage();
    },
    del: function(i){
        items.splice(i,1);
        this.storage();
    },
    delAll: function(){
        items = [];
        this.storage();
    },
    update: function(value,i){
        items[i] = {text:value};
        this.storage();
    },
    storage: function(){
        localStorage.setItem('TODOAPP',JSON.stringify(items));
    }
};

/**
 * 注意这里面的一些方法没有用arrow function
 * 原因是函数内部的this是动态绑定到store上面的
 */
var todoStore = storeCreate(todoAction, {
    /**
     * STORE APIs
     */
    getAll: function(){
        return items;
    }
}, {
    /**
     * STORE handlers
     */
    [`${TODOID}/${constants.GET_ALL}`]: function(){
        return items;
    },

    [`${TODOID}/${constants.ADD_TODO}`]: function(payload){
        API.set(payload.value);
        return items;
    },

    [`${TODOID}/${constants.DEL_TODO}`]: function(payload){
        API.del(payload.value);
        return items;
    },

    [`${TODOID}/${constants.DEL_ALL}`]: function(){
        API.delAll();
        return items;
    },

    [`${TODOID}/${constants.UPDATE_TODO}`]: function(payload){
        API.update(payload.value,payload.extParam);
        return items;
    },

    [`${TODOID}/${constants.PREV_TODO}`]: function(payload){
        let i = payload.value;
        let v1 = items[i].text;
        let v2 = items[i-1].text;
        API.update(v1, i-1);
        API.update(v2, i);
        return items;
    }
});

export default todoStore;
