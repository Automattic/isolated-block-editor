export default BlockEditorToolbar;
export type EditorMode = import('../../store/editor/reducer').EditorMode;
export type BlockEditorSettings = import('../../index').BlockEditorSettings;
export type OnMore = import('../../index').OnMore;
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnMore} OnMore */
/**
 * Block editor toolbar
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
declare function BlockEditorToolbar(props: {
    settings: BlockEditorSettings;
    editorMode: EditorMode;
    renderMoreMenu: OnMore;
}): JSX.Element;
//# sourceMappingURL=index.d.ts.map