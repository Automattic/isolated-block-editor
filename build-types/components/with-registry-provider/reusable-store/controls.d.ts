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
    let CONVERT_BLOCK_TO_STATIC: ((registry: any) => ({ clientId }: {
        clientId: any;
    }) => void) & {
        isRegistryControl?: boolean | undefined;
    };
    let CONVERT_BLOCKS_TO_REUSABLE: ((registry: any) => ({ clientIds }: {
        clientIds: any;
    }) => Promise<void>) & {
        isRegistryControl?: boolean | undefined;
    };
    let DELETE_REUSABLE_BLOCK: ((registry: any) => ({ id }: {
        id: any;
    }) => Promise<void>) & {
        isRegistryControl?: boolean | undefined;
    };
}
//# sourceMappingURL=controls.d.ts.map