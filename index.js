/**
 * Fluder-A unidirectional data flow tool based on flux.
 */

/**
 * workflow Queue
 */
import Queue from './queue';

/**
 * custom Event
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
         * store handlers 注册Map
         * @type {Object}
         */
        this._registers = {};

        /**
         * dispatch栈
         * @type {Array}
         */
        this._dispatchStack = [];

        /**
         * 初始化
         */
        this._init();
    }

    _init() {
        /**
         * 中间件，集中处理action payload和storeId
         */
        this._middleware = new Queue((payload) => {
            /**
             * 中间件队列执行完后触发Store handler的调用
             */
            this._invoke(payload);

        }, true);
    }

    /**
     * Fluder Store唯一ID
     */
    _unique() {
        return 'Fluder_Store_' + Math.round(Math.random() * 100000)
    }

    /**
     * action对handler的调用(内部调用)
     * @param  {object} payload 此时的payload包含action和action对应的storeId
     * @return {void}           无返回值
     */
    _invoke(payload) {
        /**
         * storeId: 用于map到register里面注册的handler
         * @type {string}
         */
        let {
            storeId
        } = payload;
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

        if (typeof handler === 'function') {
            // Invoke store handler
            /**
             * TODO
             * result应该为store数据的copy，暂时没做深度copy，后续把Store改写成Immutable数据结构
             * view-controller里面对result的修改不会影响到store里的数据
             */
            let result;
            let _result = handler.call(store, payload)
            /**
             * 可以没有返回值，只是set Store里面的值
             * 这里把payload传给change的Store，可以做相应的渲染优化[局部渲染]
             */
            // if (result !== undefined) {
            store.emitChange(payload, result);
            // }
        }
    }

    /**
     * 触发action(内部调用)
     * @param  {string} storeId store/action唯一标示
     * @param  {object} action  action数据
     * @return {void}           无返回值
     */
    _dispatch(storeId, payload) {
        /**
         * 在当前Action触发的Store handler回调函数中再次发起了当前Action，这样会造成A-A循环调用,出现栈溢出
         */
        if (this._currentDispatch == storeId) {
            throw Error('action '+(payload.value&&payload.value.actionType)+' __invoke__ myself!')
        }
        /**
         * 在当前Action触发的Store handler回调函数中再次触发了当前Action栈中的Action，出现A-B-C-A式循环调用，也会出现栈溢出
         */
        if (this._dispatchStack.indexOf(storeId) != -1) {
            throw Error(this._dispatchStack.join(' -> ') + storeId + ' : action __invoke__ to a circle!');
        }
        /**
         * 更新Action栈以及记录当前ActionID
         */
        this._startDispatch(storeId);
        /**
         * Action的触发必须有ActionType，原因是ActionType和Store handlers Map的key一一对应
         */
        if (!payload.type) {
            throw new Error('action type does not exist in \n' + JSON.stringify(payload, null, 2));
        }
        /**
         * 发出action的时候 统一走一遍中间件
         */
        this._middleware.execute({
            storeId,
            payload
        });
        /**
         * Action执行完更新Action栈以及删除当前ActionID
         */
        this._endDispatch()
    }

    /**
     * 更新Action栈以及记录当前ActionID
     */
    _startDispatch(storeId) {
        this._dispatchStack || (this._dispatchStack = []);
        this._dispatchStack.push(storeId);
        this._currentDispatch = storeId;
    }

    /**
     * Action执行完更新Action栈以及删除当前ActionID
     */
    _endDispatch() {
        this._dispatchStack.pop();
        this._currentDispatch = null;
    }

    /**
     * 创建action[对外API]
     * @param  {string} storeId  该action作用于那个store,和store的storeId一一对应
     * @param  {object} actionCreators 需要创建的action对象
     * @return {object} 返回一个actions对象,具有调用action触发store change的能力
     */
    actionCreate(storeId, actionCreators) {
        /**
         * 不存在storeId
         */
        if (typeof storeId == 'undefined') throw Error('id is reauired as creating a action!');
        /**
         * action handler为空,相当于没有action
         */
        if (!actionCreators || Object.keys(actionCreators).length == 0) {
            console.warn('action handler\'s length is 0, need you have a action handler?');
        }

        let creator, actions = {};
        /**
         * 遍历创建Action
         */
        for (let name in actionCreators) {
            creator = actionCreators[name];
            /**
             * 创建闭包，让creator不被回收
             */
            actions[name] = function(storeId, creator) {
                return function() {
                    /**
                     * action里面发出改变store消息
                     */
                    return this._dispatch(storeId, creator(...arguments));
                }.bind(this);
            }.call(this, storeId, creator);
        }
        return actions;
    }

    /**
     * 创建store[对外API]
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
        const CHANGE_EVENT = 'change';
        /**
         * 创建store，继承EventEmitter
         */
        let store = Object.assign(method, EventEmitter.prototype, {
            /**
             * 统一Store的EventEmitter调用方式，避免和全局EventEmitter混淆
             * 这里把payload传给change的Store，可以做相应的渲染优化[局部渲染]
             * 这里的局部优化是指全局Stores更新，触发的Store Handler较多，可以通过payload的数据过滤
             */
            emitChange: function(payload, result) {
                this.emit(CHANGE_EVENT, payload, result);
            },
            addChangeListener: function(callback) {
                this.on(CHANGE_EVENT, callback);
            },
            removeChangeListener: function(callback) {
                this.removeListener(CHANGE_EVENT, callback);
            },
            removeAllChangeListener: function() {
                this.removeAllListener()
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
     * 创建ActionStore[对外API]
     * 提供一个方法同时创建action和store，可以有效避免action和store的ID不统一的情况
     * @param  {object} actionCreators 创建action需要用到的action对象
     * @param  {object} method         创建store需要的store操作api
     * @param  {object} handlers       store的回调处理对象
     * @param  {string} storeId        action和store统一的唯一标识
     * @return {object}                返回一个action和store对象
     */
    actionStoreCreate(actionCreators, method, handlers, storeId = this._unique()) {
        /**
         * 返回值为Store+Action
         */
        return {
            action: this.actionCreate(storeId, actionCreators),
            store: this.storeCreate(storeId, method, handlers)
        }
    }

    /**
     * 中间件[对外API]
     * @param  {function} middleware action统一流入中间件
     * 这里和redux类似，和express等框架对请求的处理一样
     */
    applyMiddleware(middleware) {
        if (typeof middleware === 'function') {
            /**
             * 中间件是一个队列，一个action发出时
             * 需要排队等到所有的中间件 完成才会触发对应的handler
             * @param  {function} middleware
             */
            this._middleware.enter(middleware);
        }
        if (({}).toString.call(middleware) === '[object Array]') {
            for (let i = 0; i < middleware.length; i++) {
                if (typeof middleware === 'function') {
                    this.applyMiddleware(middleware[i])
                }
            }
        }
        //链式中间件
        return this;
    }
}
