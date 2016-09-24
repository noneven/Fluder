import {
    applyMiddleware
} from '../../../src';

export default applyMiddleware(function(data, next) {
    //日志log中间件
    let {
        storeId,
        payload,
        store
    } = data;
    console.info(`actionType: \"${payload.type}\"`);
    console.info(`storeId: \"${storeId}\"`);
    console.info(`payload: ${JSON.stringify(payload)}`);

    console.log('oldStore:');
		console.log(store.getAll && JSON.stringify(store.getAll()));
    next();
    console.log('newStore:');
    console.log(store.getAll && JSON.stringify(store.getAll()));

}).applyMiddleware(function(data, next) {
    //异步Action中间件
    /**
     * 把action里面的异步处理统一放在中间件
     */
    let {
        storeId,
        payload
    } = data;
    if (payload.uri) {
        fetch(payload.uri).then(function(response) {
                return response.json();
            })
            .then(function(response) {
                payload.response = response;
                // 异步函数中的 next 回调
                next(payload);
            });
    } else next(data); // 如果不包含 uri 字段，则不作任何处理
}).applyMiddleware(function(data, next) {
		//catchError 中间件
		let {
				storeId,
				payload,
				store
		} = data;
    try {
        return next()
    } catch (err) {
        console.error('Caught an exception!', err)
        throw err
    }
})
