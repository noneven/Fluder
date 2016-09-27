/**
 * queue
 * @type {Array}
 */
var queue = []

/**
 * queue backup
 * @type {Array}
 */
var _queue = []

/**
 * queue class
 */
function Queue (loop) {
  this.loop = (typeof loop === 'undefined') ? true : loop
}

/**
 * enter queue
 * @param {Function} - middleware task
 */
Queue.prototype.enqueue = function (task) {
  queue.push(task)
  // queue backup
  this.loop && _queue.push(task)
}

/**
 * execute the handle function
 *
 * @param {Object} - not required, in middleware handle function can be empty
 * @param {Array}  - not required, it's used to replace the middleware task
 */
Queue.prototype.execute = function (data, tasks) {
  /**
   * if tasks exist, replace the middleware tasks
   */
  tasks = tasks || queue
  var task

  /**
   * tasks not be empty
   */
  if (tasks.length) {
    /**
     * dequeue
     */
    task = tasks.shift()
    task(data, this.execute.bind(this, data, tasks))
  } else {
    /**
     * execute finished
     */
    task = null
    this.tasksAchieved(data)

    // Get backup
    this.loop && (queue = _queue.concat())
  }
}

/**
 * middleware task execute achieved will be execute the callback
 *
 * @param  {Function} - fn
 * @return {object}   - return the queue instance，mock Promise
 */
Queue.prototype.after = function (fn) {
  this.tasksAchieved = fn
  return this
}

module.exports = Queue
