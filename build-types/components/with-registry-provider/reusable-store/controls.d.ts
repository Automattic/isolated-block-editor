/**
 * Convert a reusable block to a static block effect handler
 *
 * @param {string}  clientId Block ID.
 * @return {Object} control descriptor.
 */
export function convertBlockToStatic(clientId: string): any;
/**
 * Convert a static block to a reusable block effect handler
 *
 * @param {Array}  clientIds Block IDs.
 * @return {Object} control descriptor.
 */
export function convertBlocksToReusable(clientIds: any[]): any;
/**
 * Deletes a reusable block.
 *
 * @param {string} id Reusable block ID.
 * @return {Object} control descriptor.
 */
export function deleteReusableBlock(id: string): any;
export default controls;
declare namespace controls {
    const CONVERT_BLOCK_TO_STATIC: Function;
    const CONVERT_BLOCKS_TO_REUSABLE: Function;
    const DELETE_REUSABLE_BLOCK: Function;
}
//# sourceMappingURL=controls.d.ts.map