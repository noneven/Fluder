
/**
 * Mini Queue Class
 * @param {Function} complete callback,
 * when queue is done, then invoke complete callback
 * @param {Boolean} whether execute workflow of loop
 */
export default class Queue {

    constructor(completeCallback, loop) {
        this.workflows = [];
        this.completeCallback = completeCallback;

        if (loop) {
            this._workflows = [];
        }
    }
    /**
     * Enter queue
     * @param {Function} workflow function
     */
    enter(workflow) {
        this.workflows.push(workflow);

        // Backup workflow
        if (this._workflows) {
            this._workflows.push(workflow);
        }
    }
    /**
     * Execute workflow
     * @param {Object} workflow function data required
     */
    execute(data, workflows) {
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
            this.completeCallback(data);
        }
    }
}
