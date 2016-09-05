export function unique(){
	  /**
     * Fluder Store唯一ID
     */
    return '@@Fluder/StoreId/' + Math.random().toString(36).substring(7).split('').join('.');
}