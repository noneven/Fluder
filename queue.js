/**
 * Mini Queue Class
 * @param {Function} complete callback,
 * when queue is done, then invoke complete callback
 * @param {Boolean} whether execute workflow of loop
 */
var Queue = function (completeCallback, loop) {
    this._init();
    this._initQueue.apply(this, arguments);
};

Queue.prototype = {
    _init: function(){
        this.workflows = [];
        this.completeQueue = [];
    },
    _initQueue: function(){
        
        var args = [].slice.call(arguments);
        var loop = args.pop();
        if(typeof loop=='boolean'){
            loop&&(this._workflows = []);
            this.completeQueue.push.apply(this.completeQueue, args);
        }else{
            this.completeQueue.push.apply(this.completeQueue, arguments);
        }
    },
    /**
     * Enter queue
     * @param {Function} workflow function
     */
    enter: function () {
        this.workflows.push.apply(this.workflows,arguments);

        // Backup workflow
        if (this._workflows) {
            this._workflows.push.apply(this.workflows,arguments);
        }
    },

    /**
     * Execute workflow
     * @param {Object} workflow function data required
     */
    execute: function (data, workflows) {
        workflows = workflows || this.workflows.concat();
        var workflow;

        if (workflows.length) {
            workflow = workflows.shift();
            workflow(data, this.execute.bind(this, data, workflows));
        }else {
            // Get backup, begin loop
            if (this._workflows) {
                this.workflows = this._workflows.concat();
            }

            workflows = null;
            this.completeQueue.forEach(function(callback){
                callback(data)
            })
        }
    }
};
export default Queue
