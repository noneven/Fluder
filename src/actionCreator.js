var Fluder = require('./fluder')
/**
 * create action [export API]
 * return the actions will dispatch the store change
 *
 * @param  {object} - actionCreators [generate action]
 * @param  {string} - storeId  [not required, action and store
 * connect with the unique id, if no, store will create a __id__ with the action]
 * @return {object} - actionor
 */
function actionCreate (actionCreators, storeId) {
  /**
   * action handler empty
   */
  if (!actionCreators || Object.keys(actionCreators).length === 0) {
    console.warn('action handler\'s length is 0, need you have a action handler?')
  }

  var creator
  var actions = {}
  /**
   * loop create action
   */
  for (var name in actionCreators) {
    creator = actionCreators[name]

    actions[name] = function (creator) {
      return function () {
        /**
         * action dispatch the store change with the storeId
         * or the action hidden __id__
         */
        return this.dispatch(storeId || actions.__id__, creator.apply(null, arguments))
      }.bind(this)
    }.call(Fluder, creator)
  }
  return actions
}

module.exports = actionCreate
