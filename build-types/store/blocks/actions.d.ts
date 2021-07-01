export default actions;
declare namespace actions {
    function undo(): import("redux").Action<any>;
    function undo(): import("redux").Action<any>;
    function redo(): import("redux").Action<any>;
    function redo(): import("redux").Action<any>;
    /**
     * Update blocks without undo history
     * @param {object[]} blocks
     * @param {object} options
     */
    function updateBlocksWithUndo(blocks: any[], options?: any): any;
    /**
     * Update blocks without undo history
     * @param {object[]} blocks
     * @param {object} options
     */
    function updateBlocksWithUndo(blocks: any[], options?: any): any;
    /**
     * Update blocks without undo history
     * @param {object[]} blocks
     * @param {object} options
     */
    function updateBlocksWithoutUndo(blocks: any[], options?: any): any;
    /**
     * Update blocks without undo history
     * @param {object[]} blocks
     * @param {object} options
     */
    function updateBlocksWithoutUndo(blocks: any[], options?: any): any;
}
//# sourceMappingURL=actions.d.ts.map