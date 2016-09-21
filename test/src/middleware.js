
var applyMiddleware = require('../../src/applyMiddleware');

/**
 * 中间件引入
 */
module.exports = applyMiddleware((data, next)=>{
  let {storeId, payload} = data;
  console.log('--------------middleware loggor------------------');
	console.info(`actionType: \"${payload.type}\"`);
	console.info(`storeId: \"${storeId}\"`);
  console.log(payload);
  console.log('--------------middleware loggor------------------\n');
  next();
})
