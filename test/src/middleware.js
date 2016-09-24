var applyMiddleware = require('../../src/applyMiddleware')

/**
 * 中间件引入
 */
module.exports = applyMiddleware((data, next) => {
  let {
    storeId,
    payload,
    store
  } = data
  console.log('--------------middleware loggor------------------')
  console.info(`actionType: \"${payload.type}\"`)
  console.info(`storeId: \"${storeId}\"`)
  console.log(payload)
  console.log('old store')
  console.log(store.getAll && store.getAll())
  next()
  console.log('new store')
  console.log(store.getAll && store.getAll())
  console.log('--------------middleware loggor------------------\n')
})
