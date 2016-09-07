
/**
 * 队列
 * @type {Array}
 */
let queue = []

/**
 * 队列备份
 * @type {Array}
 */
let _queue = []

/**
 * 队列类
 */
export default class Queue {

    /**
     * 构造函数
     * @param {Boolean} 是否循环执行队列
     */
    constructor(loop=true) {
        this.loop = loop;
    }

    /**
     * 入队
     * @param {Function} 排队函数
     */
    enqueue(task) {
        //入队
        queue.push(task);
        // Backup
        this.loop&&_queue.push(task);
    }

    /**
     * 执行队列函数
     * @param {Object} 可为空，在排队函数中流通的data
     * @param {Array} 可为空，替换队列中的排队函数
     */
    execute(data, tasks) {

        /**
         * 如果tasks存在则忽略排队函数
         */
        tasks = tasks || queue;
        let task;

        /**
         * 队列不为空
         */
        if (tasks.length) {
            /**
             * 出队
             */
            task = tasks.shift();
            task(data, this.execute.bind(this, data, tasks));
        }else {

            /**
             * 队列为空，执行完成
             */
            task = null;
            this.tasksAchieved(data);

            // Get backup
            this.loop&& (queue = _queue.concat())
        }
    }

    /**
     * 队列中排队函数执行完成后的回调函数
     * @param  {Function} fn 
     * @return {object}   返回队列实例，mock Promise
     */
    then(fn) {
        this.tasksAchieved = fn;
        return this;
    }
}

