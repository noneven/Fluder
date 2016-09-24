function unique () {
  /**
   * Fluder Store唯一ID
   */
  return '@@Fluder/StoreId/' +
    Math.random()
    .toString(36)
    .substring(2)
}

/**
 * 可以有中间件实现
 * @param  {error} e 错误对象
 */
function catchError (e) {
  var start = '\n\n@@Fluder/Start\n'
  var end = '\n@@Fluder/End\n\n'

  throw Error(start +
    'Error: ' +
    (e.line ? (e.line + '行') : '') +
    (e.column ? (e.column + '列') : '') +
    e.message +
    end)
}

/**
 * 获取数据类型
 * @param  {*} p enter data
 * @return {string} 返回的字符串数据
 */
function getType (p) {
	var tostring = Object.prototype.toString.call(p);
	return tostring.substring(8,tostring.length-1).toLowerCase()
}

module.exports = {
  unique: unique,
	getType: getType,
  catchError: catchError
}
