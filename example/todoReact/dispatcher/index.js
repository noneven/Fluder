import {applyMiddleware} from '../../../src';

export default applyMiddleware(function(data, next){
	let {storeId, payload} = data;
	console.info(`actionType: \"${payload.type}\"`);
	console.info(`storeId: \"${storeId}\"`);
    console.log(payload);
    next();
}).applyMiddleware(function(data, next){
	/**
	 * 把action里面的异步处理统一放在中间件
	 */
	let {storeId, payload} = data;
	if (payload.uri) {
        fetch(payload.uri).then(function(response){
            return response.json();
        })
        .then(function(response){
            payload.response = response;
            // 异步函数中的 next 回调
            next(payload);
        });
    }else next(data); // 如果不包含 uri 字段，则不作任何处理
})
