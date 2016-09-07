export function unique(){
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
export function catchError(e){
	let start = '\n\n@@Fluder/Start\n';
	let end = '\n@@Fluder/End\n\n';

	throw Error(start +
		'Error: ' +
		e.line + "行" +
		e.column + '列' +
		e.message +
		end);
}
