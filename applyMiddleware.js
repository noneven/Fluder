import Fluder from './fluder';

/**
 * 中间件[对外API]
 * @param  {function} middleware action统一流入中间件
 * 这里和redux类似，和express等框架对请求的处理一样
 */

export default function applyMiddleware(middleware) {
    if (typeof middleware === 'function') {
        /**
         * 中间件是一个队列，一个action发出时
         * 需要排队等到所有的中间件 完成才会触发对应的handler
         * @param  {function} middleware
         */
        Fluder.enter(middleware);
    }
    if (({}).toString.call(middleware) === '[object Array]') {
        for (let i = 0; i < middleware.length; i++) {
            if (typeof middleware === 'function') {
                applyMiddleware(middleware[i])
            }
        }
    }
    //支持链式中间件
    return {
    	applyMiddleware: applyMiddleware
    }
}