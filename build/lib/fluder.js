(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fluder", [], factory);
	else if(typeof exports === 'object')
		exports["Fluder"] = factory();
	else
		root["Fluder"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actionStoreCreate = exports.applyMiddleware = exports.actionCreate = exports.storeCreate = undefined;
	
	var _storeCreator = __webpack_require__(1);
	
	var _storeCreator2 = _interopRequireDefault(_storeCreator);
	
	var _actionCreator = __webpack_require__(6);
	
	var _actionCreator2 = _interopRequireDefault(_actionCreator);
	
	var _applyMiddleware = __webpack_require__(7);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _actionStoreCreator = __webpack_require__(8);
	
	var _actionStoreCreator2 = _interopRequireDefault(_actionStoreCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.storeCreate = _storeCreator2.default;
	exports.actionCreate = _actionCreator2.default;
	exports.applyMiddleware = _applyMiddleware2.default;
	exports.actionStoreCreate = _actionStoreCreator2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = storeCreate;
	
	var _fluder = __webpack_require__(2);
	
	var _fluder2 = _interopRequireDefault(_fluder);
	
	var _events = __webpack_require__(5);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 创建store[对外API]
	 * @param  {string} storeId  该store的唯一标识，和action里的storeId一一对应
	 * @param  {object} method   操作store的api(一般提供get set del update等)
	 * @param  {object} handlers action的处理回调对象，handler的key需要和actionType一致
	 * @return {object}          返回store对象
	 */
	function storeCreate(storeId, method, handlers) {
	    /**
	     * 不存在storeId
	     */
	    if (typeof storeId == 'undefined') {
	        throw Error('id is reauired as create a store, and the id is the same of store!');
	    }
	    var CHANGE_EVENT = 'change';
	    /**
	     * 创建store，继承EventEmitter
	     */
	    var store = Object.assign(method, _events2.default.prototype, {
	        /**
	         * 统一Store的EventEmitter调用方式，避免和全局EventEmitter混淆
	         * 这里把payload传给change的Store，可以做相应的渲染优化[局部渲染]
	         * 这里的局部优化是指全局Stores更新，触发的Store Handler较多，可以通过payload的数据过滤
	         */
	        emitChange: function emitChange(payload, result) {
	            this.emit(CHANGE_EVENT, payload, result);
	        },
	        addChangeListener: function addChangeListener(callback) {
	            this.on(CHANGE_EVENT, callback);
	        },
	        removeChangeListener: function removeChangeListener(callback) {
	            this.removeListener(CHANGE_EVENT, callback);
	        },
	        removeAllChangeListener: function removeAllChangeListener() {
	            this.removeAllListener();
	        }
	    });
	
	    _fluder2.default.register(storeId, { store: store, handlers: handlers });
	
	    return store;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	/**
	 * Fluder 0.1.0
	 * A unidirectional data flow tool based on flux.
	 *
	 * url: https://github.com/coderwin/Fluder
	 * author: chenjiancj2011@outlook.com
	 * weibo: imChenJian
	 * date: 2016-08-10
	 */
	
	/**
	 * workflow Queue
	 */
	
	
	/**
	 * catchError
	 */
	
	
	/**
	 * custom Event
	 */
	
	
	var _queue = __webpack_require__(3);
	
	var _queue2 = _interopRequireDefault(_queue);
	
	var _tools = __webpack_require__(4);
	
	var _events = __webpack_require__(5);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Fluder
	 */
	exports.default = new (function () {
	
	  /**
	   * 构造函数
	   * @return {object} 返回Fluder实例对象
	   */
	  function Fluder() {
	    _classCallCheck(this, Fluder);
	
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
	
	  _createClass(Fluder, [{
	    key: '_init',
	    value: function _init() {
	      var _this = this;
	
	      /**
	       * 中间件，集中处理action payload和storeId
	       */
	      this._middleware = new _queue2.default(true).after(function (payload) {
	
	        /**
	         * 中间件队列执行完后触发Store handler的调用
	         */
	        _this._invoke(payload);
	      });
	    }
	
	    /**
	     * action对handler的调用(内部调用)
	     * @param  {object} payload 此时的payload包含action和action对应的storeId
	     * @return {void}           无返回值
	     */
	
	  }, {
	    key: '_invoke',
	    value: function _invoke(payload) {
	
	      /**
	       * storeId: 用于map到register里面注册的handler
	       * @type {string}
	       */
	      var _payload = payload;
	      var storeId = _payload.storeId;
	
	      /**
	       * store和它对应的handler
	       * @type {object}
	       */
	
	      var _registers$storeId = this._registers[storeId];
	      var store = _registers$storeId.store;
	      var handlers = _registers$storeId.handlers;
	
	      /**
	       * action payload
	       * @type {object}
	       */
	
	      payload = payload.payload;
	
	      /**
	       * 在当前storeId的store Map到对应的handler
	       * @type {function}
	       */
	      var handler = handlers[payload.type];
	
	      if (typeof handler === 'function') {
	
	        /**
	         * TODO
	         * result应该为store数据的copy，暂时没做深度copy，后续把Store改写成Immutable数据结构
	         * view-controller里面对result的修改不会影响到store里的数据
	         */
	        var result = void 0;
	        var _result = handler.call(store, payload);
	
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
	     * 更新Action栈以及记录当前ActionID
	     */
	
	  }, {
	    key: '_startDispatch',
	    value: function _startDispatch(storeId) {
	      this._dispatchStack || (this._dispatchStack = []);
	      this._dispatchStack.push(storeId);
	      this._currentDispatch = storeId;
	    }
	
	    /**
	     * Action执行完更新Action栈以及删除当前ActionID
	     */
	
	  }, {
	    key: '_endDispatch',
	    value: function _endDispatch() {
	      this._dispatchStack.pop();
	      this._currentDispatch = null;
	    }
	
	    /**
	     * Store和handler注册
	     * @param  {string} storeId store/action唯一标示
	     * @param  {object} storeHandler  store和handler
	     * @return {void}           无返回值
	     */
	
	  }, {
	    key: 'register',
	    value: function register(storeId, storeHandler) {
	      this._registers[storeId] = storeHandler;
	    }
	
	    /**
	     * 中间件入队
	     * @param  {function} middleware  中间件处理函数
	     * @return {void}           无返回值
	     */
	
	  }, {
	    key: 'enqueue',
	    value: function enqueue(middleware) {
	      this._middleware.enqueue(middleware);
	    }
	
	    /**
	     * 触发action(内部调用)
	     * @param  {string} storeId store/action唯一标示
	     * @param  {object} action  action数据
	     * @return {void}           无返回值
	     */
	
	  }, {
	    key: 'dispatch',
	    value: function dispatch(storeId, payload) {
	
	      /**
	       * 在当前Action触发的Store handler回调函数中再次发起了当前Action，这样会造成A-A循环调用,出现栈溢出
	       */
	      if (this._currentDispatch == storeId) {
	
	        throw Error('action ' + (payload.value && payload.value.actionType) + ' __invoke__ myself!');
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
	
	      try {
	
	        /**
	         * 发出action的时候 统一走一遍中间件
	         * 
	         * {
	         *     storeId,
	         *     payload
	         * }
	         *
	         * shallow Immutable
	         */
	        this._middleware.execute(Object.freeze({
	          storeId: storeId,
	          payload: payload
	        }));
	      } catch (e) {
	
	        /**
	         * 执行handler的时候出错end掉当前dispatch
	         */
	        this._endDispatch();
	
	        /**
	         * 抛出错误信息
	         */
	        (0, _tools.catchError)(e);
	      }
	
	      /**
	       * Action执行完更新Action栈以及删除当前ActionID
	       */
	      this._endDispatch();
	    }
	  }]);
	
	  return Fluder;
	}())();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 队列
	 * @type {Array}
	 */
	var queue = [];
	
	/**
	 * 队列备份
	 * @type {Array}
	 */
	var _queue = [];
	
	/**
	 * 队列类
	 */
	
	var Queue = function () {
	
	  /**
	   * 构造函数
	   * @param {Boolean} 是否循环执行队列
	   */
	  function Queue() {
	    var loop = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	    _classCallCheck(this, Queue);
	
	    this.loop = loop;
	  }
	
	  /**
	   * 入队
	   * @param {Function} 排队函数
	   */
	
	
	  _createClass(Queue, [{
	    key: "enqueue",
	    value: function enqueue(task) {
	      //入队
	      queue.push(task);
	      // Backup
	      this.loop && _queue.push(task);
	    }
	
	    /**
	     * 执行队列函数
	     * @param {Object} 可为空，在排队函数中流通的data
	     * @param {Array} 可为空，替换队列中的排队函数
	     */
	
	  }, {
	    key: "execute",
	    value: function execute(data, tasks) {
	
	      /**
	       * 如果tasks存在则忽略排队函数
	       */
	      tasks = tasks || queue;
	      var task = void 0;
	
	      /**
	       * 队列不为空
	       */
	      if (tasks.length) {
	        /**
	         * 出队
	         */
	        task = tasks.shift();
	        task(data, this.execute.bind(this, data, tasks));
	      } else {
	
	        /**
	         * 队列为空，执行完成
	         */
	        task = null;
	        this.tasksAchieved(data);
	
	        // Get backup
	        this.loop && (queue = _queue.concat());
	      }
	    }
	
	    /**
	     * 队列中排队函数执行完成后的回调函数
	     * @param  {Function} fn 
	     * @return {object}   返回队列实例，mock Promise
	     */
	
	  }, {
	    key: "after",
	    value: function after(fn) {
	      this.tasksAchieved = fn;
	      return this;
	    }
	  }]);
	
	  return Queue;
	}();
	
	exports.default = Queue;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.unique = unique;
	exports.catchError = catchError;
	function unique() {
		/**
	     * Fluder Store唯一ID
	     */
		return '@@Fluder/StoreId/' + Math.random().toString(36).substring(7).split('').join('.');
	}
	function catchError(e) {
		var start = '\n\n@@Fluder/Start\n';
		var end = '\n@@Fluder/End\n\n';
	
		throw Error(start + 'Error: ' + (e.line ? e.line + '行' : '') + (e.column ? e.column + '列' : '') + e.message + end);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events) this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler)) return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;
	
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  if (!this._events) this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener)) throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type]) return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0) return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;
	
	  if (!this._events) return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = actionCreate;
	
	var _fluder = __webpack_require__(2);
	
	var _fluder2 = _interopRequireDefault(_fluder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 创建action[对外API]
	 * @param  {string} storeId  该action作用于那个store,和store的storeId一一对应
	 * @param  {object} actionCreators 需要创建的action对象
	 * @return {object} 返回一个actions对象,具有调用action触发store change的能力
	 */
	function actionCreate(storeId, actionCreators) {
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
	
	  var creator = void 0,
	      actions = {};
	  /**
	   * 遍历创建Action
	   */
	  for (var name in actionCreators) {
	    creator = actionCreators[name];
	    /**
	     * 创建闭包，让creator不被回收
	     */
	    actions[name] = function (storeId, creator) {
	      return function () {
	        /**
	         * action里面发出改变store消息
	         */
	        return this.dispatch(storeId, creator.apply(undefined, arguments));
	      }.bind(this);
	    }.call(_fluder2.default, storeId, creator);
	  }
	  return actions;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = applyMiddleware;
	
	var _fluder = __webpack_require__(2);
	
	var _fluder2 = _interopRequireDefault(_fluder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 中间件[对外API]
	 * @param  {function} middleware action统一流入中间件
	 * 这里和redux类似，和express等框架对请求的处理一样
	 */
	
	function applyMiddleware(middleware) {
	    if (typeof middleware === 'function') {
	        /**
	         * 中间件是一个队列，一个action发出时
	         * 需要排队等到所有的中间件 完成才会触发对应的handler
	         * @param  {function} middleware
	         */
	        _fluder2.default.enqueue(middleware);
	    }
	    if ({}.toString.call(middleware) === '[object Array]') {
	        for (var i = 0; i < middleware.length; i++) {
	            if (typeof middleware === 'function') {
	                applyMiddleware(middleware[i]);
	            }
	        }
	    }
	    //支持链式中间件
	    return {
	        applyMiddleware: applyMiddleware
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = actionStoreCreate;
	
	var _tools = __webpack_require__(4);
	
	var _storeCreator = __webpack_require__(1);
	
	var _storeCreator2 = _interopRequireDefault(_storeCreator);
	
	var _actionCreator = __webpack_require__(6);
	
	var _actionCreator2 = _interopRequireDefault(_actionCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function actionStoreCreate(actionCreators, method, handlers) {
		var storeId = arguments.length <= 3 || arguments[3] === undefined ? (0, _tools.unique)() : arguments[3];
	
		return {
			actionor: (0, _actionCreator2.default)(storeId, actionCreators),
			storeor: (0, _storeCreator2.default)(storeId, method, handlers)
		};
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fluder.js.map