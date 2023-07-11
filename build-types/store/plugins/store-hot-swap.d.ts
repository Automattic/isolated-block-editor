export default storeHotSwapPlugin;
/**
 * Swap any access to `core/block-editor` to the currently focussed editor store. This ensures that blocks that directly access
 * wp.data still work.
 *
 * Note that store plugins are currently marked as deprecated. It's unknown what will replace them, and this will need to be updated
 * once that happens.
 *
 * @param {Object} registry
 * @param {Object} pluginOptions
 */
declare function storeHotSwapPlugin(registry: any, pluginOptions: any): {
    dispatch(reducerKey: any): any;
    select(reducerKey: any): any;
};
declare namespace storeHotSwapPlugin {
    let targetSelect: any;
    let targetDispatch: any;
    function setEditor(select: any, dispatch: any): void;
    function resetEditor(): void;
}
//# sourceMappingURL=store-hot-swap.d.ts.map