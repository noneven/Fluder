var Fluder = require('./fluder')

/**
 * Middleware [export API]
 *
 * with redux-middleware similar,
 * and the same with express handle the request
 *
 * @param  {function} - middleware action use the middleware function
 */
function applyMiddleware (middleware) {
  if (typeof middleware === 'function') {
    /**
     * Middleware is a Queue, as action sending,
     * need the queue[all middleware] is finished, the handler will invoke
     * @param  {function} - middleware
     */
    Fluder.enqueue(middleware)
  }
  /**
   * you can participate the param with array
   */
  if (({}).toString.call(middleware) === '[object Array]') {
    for (var i = 0; i < middleware.length; i++) {
      if (typeof middleware[i] === 'function') {
        applyMiddleware(middleware[i])
      }
    }
  }
  /**
   * chain middleware
   */
  return {
    applyMiddleware: applyMiddleware
  }
}
module.exports = applyMiddleware
