export default EditorLoaded;
export type OnLoad = () => any;
/**
 * @callback OnLoad
 */
/**
 * Used by clients to add an optional loading placeholder
 *
 * @param {Object} props - Component props
 * @param {OnLoad} [props.onLoaded] - Callback to signal that the editor has loaded
 * @param {OnLoad} [props.onLoading] - Callback to signal that the editor is loading
 */
declare function EditorLoaded({ onLoaded, onLoading }: {
    onLoaded?: OnLoad | undefined;
    onLoading?: OnLoad | undefined;
}): null;
//# sourceMappingURL=index.d.ts.map