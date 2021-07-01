/**
 * Block validity is a function of blocks state (at the point of a
 * reset) and the template setting. As a compromise to its placement
 * across distinct parts of state, it is implemented here as a side-
 * effect of the block reset action.
 *
 * @param {Object} action RESET_BLOCKS action.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} New validity set action if validity has changed.
 */
export function validateBlocksToTemplate(action: any, store: any): any | null;
declare namespace _default {
    function MERGE_BLOCKS(action: any, store: any): void;
    function MERGE_BLOCKS(action: any, store: any): void;
    const RESET_BLOCKS: (typeof validateBlocksToTemplate)[];
    function MULTI_SELECT(action: any, { getState }: {
        getState: any;
    }): void;
    function SYNCHRONIZE_TEMPLATE(action: any, { getState }: {
        getState: any;
    }): any;
    function SYNCHRONIZE_TEMPLATE(action: any, { getState }: {
        getState: any;
    }): any;
    function MARK_AUTOMATIC_CHANGE(action: any, store: any): void;
    function MARK_AUTOMATIC_CHANGE(action: any, store: any): void;
}
export default _default;
//# sourceMappingURL=effects.d.ts.map