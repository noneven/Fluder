/**
 * 队列
 * @type {Array}
 */
var queue = []

/**
 * 队列备份
 * @type {Array}
 */
var _queue = []

/**
 * 队列类
 */
function Queue(loop) {
    this.loop = (typeof loop == 'undefined') ? true : loop
}

/**
 * 入队
 * @param {Function} 排队函数
 */
Queue.prototype.enqueue = function(task) {
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
Queue.prototype.execute = function(data, tasks) {

    /**
     * 如果tasks存在则忽略排队函数
     */
    tasks = tasks || queue;
    var task;

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
        this.loop && (queue = _queue.concat())
    }
}

/**
 * 队列中排队函数执行完成后的回调函数
 * @param  {Function} fn
 * @return {object}   返回队列实例，mock Promise
 */
Queue.prototype.after = function(fn) {
    this.tasksAchieved = fn;
    return this;
}

module.exports = Queue
