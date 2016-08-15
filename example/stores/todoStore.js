/**
 * STORE部分
 */
import Flilia from '../dispatcher/';
import constants from '../constants/constants';
/**
 * STORE唯一标示，和actionId一一对应
 */
var TODOID = constants.TODO_STORE_ID;
/**
 * 注意这里面的一些方法没有用arrow function
 * 原因是函数内部的this是动态绑定到store上面的
 */
var todoStore = Flilia.storeCreate(TODOID, {
    /**
     * store数据(states)存储
     */
    items: function(){
        var TODOAPP = localStorage.getItem('TODOAPP');
        return TODOAPP?JSON.parse(TODOAPP):[];
    }(),
    /**
     * STORE APIs
     */
    getAll: function(){
        return this.items;
    },
    set: function(item){
        this.items.push({text:item});
		this.storage();
    },
    del: function(i){
    	this.items.splice(i,1);
		this.storage();
    },
    delAll: function(){
    	this.items = [];
		this.storage();
    },
    update: function(value,i){
        this.items[i] = {text:value};
        this.storage();
    },
	storage: function(){
		localStorage.setItem('TODOAPP',JSON.stringify(this.items));
	}
}, {
    /**
     * STORE handlers
     */
    [`${TODOID}/${constants.GET_ALL}`]: function(){
        return this.items;
    },

    [`${TODOID}/${constants.ADD_TODO}`]: function(payload){
        this.set(payload.value);
        return this.items;
    },

    [`${TODOID}/${constants.DEL_TODO}`]: function(payload){
        this.del(payload.value);
        return this.items;
    },

    [`${TODOID}/${constants.DEL_ALL}`]: function(){
        this.delAll(); 
        return this.items;
    },

    [`${TODOID}/${constants.UPDATE_TODO}`]: function(payload){
        this.update(payload.value,payload.extParam);
        return this.items;
    },

    [`${TODOID}/${constants.PREV_TODO}`]: function(payload){
        let i = payload.value;
        let v1 = this.items[i].text;
        let v2 = this.items[i-1].text;
        this.update(v1, i-1);
        this.update(v2, i);
        return this.items;
    }
});
export default todoStore;