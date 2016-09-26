function unique () {
  /**
   * Fluder Store id
   */
  return '@@Fluder/StoreId/' +
    Math.random()
    .toString(36)
    .substring(2)
}

/**
 * middleware can be realize
 * @param  {error} e error object
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
 * get data object
 * @param  {*} p enter data
 * @return {string} return type
 */
function getType (p) {
  var tostring = Object.prototype.toString.call(p)
  return tostring.substring(8, tostring.length - 1).toLowerCase()
}

module.exports = {
  unique: unique,
  getType: getType,
  catchError: catchError
}
