function unique() {
    /**
     * Fluder Store唯一ID
     */
    return '@@Fluder/StoreId/' +
        Math.random()
        .toString(36)
        .substring(7)
        .split('')
        .join('.');
}

function catchError(e) {
    var start = '\n\n@@Fluder/Start\n';
    var end = '\n@@Fluder/End\n\n';

    throw Error(start +
        'Error: ' +
        (e.line ? (e.line + '行') : '') +
        (e.column ? (e.column + '列') : '') +
        e.message +
        end);
}

module.exports = {
    unique: unique,
    catchError: catchError
};
