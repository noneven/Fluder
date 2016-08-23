/**
 * 队列
 */
import Queue from './queue';
/**
 * 事件
 */
import EventEmitter from 'events';
/**
 * Fluder
 */
export default class Fluder {
    /**
     * 构造函数
     * @return {object} 返回Fluder实例对象
     */
    constructor() {
        /**
         * actionStoreCreate时的默认id
         * @type {Number}
         */
        this._storeId = 0;
        /**
         * store handler 注册Map
         * @type {Object}
         */
        this._registers = {};
        this._dispatchStoreIdStack = [];
        this.init();
    }
    init(){
        /**
         * 中间件，集中处理action
         */
        this._middlewareQueue = new Queue(function(payload) {
            /**
             * 中间件队列执行完后触发handler的调用
             */
            this.__invoke__(payload);
            
        }.bind(this), true);
    }
    /**
     * action对handler的调用(内部调用)
     * @param  {object} payload 此时的payload包含action和action对应的storeId
     * @return {void}           无返回值
     */
    __invoke__(payload) {
        /**
         * storeId: 用于map到register里面注册的handler
         * @type {string}
         */
        let storeId = payload.storeId;
        /**
         * store和它对应的handler
         * @type {object}
         */
        let {
            store,
            handlers
        } = this._registers[storeId];
        /**
         * action payload
         * @type {object}
         */
        payload = payload.payload;
        /**
         * 在当前storeId的store Map到对应的handler
         * @type {function}
         */
        let handler = handlers[payload.type];
        let result;

        if (typeof handler === 'function') {
            /**
             * result是数据的copy
             * view-controller里面对result的修改不会影响到store里的数据
             */
            result = handler.call(store, payload);
            // Invoke store handler
            if (result !== undefined) {
                store.emitChange(result);
            }
        }
    }

    /**
     * 触发action(内部调用)
     * @param  {string} storeId store/action唯一标示
     * @param  {object} action  action数据
     * @return {void}           无返回值
     */
    __dispatch__(storeId, payload) {

        if(this._currentDispatchStoreId == storeId){
            throw Error('action __invoke__ self!')
        }
        if(this._dispatchStoreIdStack.indexOf(storeId)!=-1){
            throw Error('action __invoke__ to a circle!');
        }

        this._startDispatch(storeId);
        
        let actionType = payload.type;
        if (!actionType) {
            throw new Error('action type does not exist in \n' + JSON.stringify(payload, null, 2));
        }
        /**
         * 发出action的时候 统一走一遍中间件
         */
        this._middlewareQueue.execute({
            storeId,
            payload
        });
        this._endDispatch()
    }

    _startDispatch(storeId){
        this._dispatchStoreIdStack||(this._dispatchStoreIdStack=[]);
        this._dispatchStoreIdStack.push(storeId);
        this._currentDispatchStoreId = storeId;
    }
    _endDispatch(){
        this._dispatchStoreIdStack.pop();
        this._currentDispatchStoreId = undefined;
    }

    /**
     * 创建action
     * @param  {string} storeId  该action作用于那个store,和store的storeId一一对应
     * @param  {object} actionCreators 需要创建的action对象
     * @return {object} 返回一个actions对象,具有调用action触发store change的能力
     */
    actionCreate(storeId, actionCreators) {
        /**
         * 不存在storeId
         */
        if (typeof storeId == 'undefined') throw Error('id is reauired as create a action!');
        /**
         * action handler为空,相当于没有action
         */
        if (!actionCreators || Object.keys(actionCreators).length == 0) {
            console.warn('action handler\'s length is 0, need you a action handler?');
        }

        let creator;
        let actions = {};
        /**
         * 遍历创建
         */
        for (let name in actionCreators) {
            creator = actionCreators[name];
            /**
             * 创建闭包，让creator不被回收
             */
            actions[name] = (function(storeId, creator) {
                return function() {
                    /**
                     * action里面发出改变store消息
                     */
                    this.__dispatch__(storeId, creator(...arguments));

                }.bind(this);

            }.bind(this))(storeId, creator);
        }
        return actions;
    }

    /**
     * 创建store
     * @param  {string} storeId  该store的唯一标识，和action里的storeId一一对应
     * @param  {object} method   操作store的api(一般提供get set del update等)
     * @param  {object} handlers action的处理回调对象，handler的key需要和actionType一致
     * @return {object}          返回store对象
     */
    storeCreate(storeId, method, handlers) {
        /**
         * 不存在storeId
         */
        if (typeof storeId == 'undefined') {
            throw Error('id is reauired as create a store, and the id is the same of store!');
        }
        /**
         * 创建store
         */
        const CHANGE_EVENT = 'change';
        let store = Object.assign(method, EventEmitter.prototype, {
            emitChange: function(result) {
                this.emit(CHANGE_EVENT,result);
            },
            addChangeListener: function(callback) {
                this.on(CHANGE_EVENT, callback);
            },
            removeChangeListener: function(callback) {
                this.removeListener(CHANGE_EVENT, callback);
            }
        });
        /**
         * 注册到register MAP里面
         */
        this._registers[storeId] = {
            store,
            handlers
        };
        return store;
    }

    /**
     * 提供一个方法同时创建action和store，可以有效避免action和store的ID不统一的情况
     * @param  {object} actionCreators 创建action需要用到的action对象
     * @param  {object} method         创建store需要的store操作api
     * @param  {object} handlers       store的回调处理对象
     * @param  {string} storeId        action和store统一的唯一标识
     * @return {object}                返回一个action和store对象
     */
    actionStoreCreate(actionCreators, method, handlers, storeId = this._storeId++) {
        return {
            action: this.actionCreate(storeId, actionCreators),
            store: this.storeCreate(storeId, method, handlers)
        }
    }
    
    /**
     * 中间件
     * @param  {function} middleware action统一流入中间件
     *
     * 这里和redux类似，和express等框架对请求的处理一样
     */
    use(middleware) {
        if (typeof middleware === 'function') {
            /**
             * 中间件是一个队列，一个action发出时
             * 需要排队等到所有的中间件 完成才会触发对应的handler
             * @param  {function} middleware
             */
            this._middlewareQueue.enter(middleware);
        }
        if(({}).toString.call(middleware)==='[object Array]'){
            for (let i = 0; i < middleware.length; i++) {
                this.use(middleware[i])
            }
        }
        return this;
    }
}
