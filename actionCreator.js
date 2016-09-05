import Fluder from './fluder';
/**
 * 创建action[对外API]
 * @param  {string} storeId  该action作用于那个store,和store的storeId一一对应
 * @param  {object} actionCreators 需要创建的action对象
 * @return {object} 返回一个actions对象,具有调用action触发store change的能力
 */
export default function actionCreate(storeId, actionCreators) {
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
                return Fluder.dispatch(storeId, creator(...arguments));
            }.bind(Fluder);
        }.call(Fluder, storeId, creator);
    }
    return actions;
}