export default WritingMenu;
export type BlockEditorSettings = import('../../../index').BlockEditorSettings;
export type OnClose = import('./index').OnClose;
/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('./index').OnClose} OnClose */
/**
 * Writing menu
 *
 * @param {Object} props - Component props
 * @param {OnClose} props.onClose - Close the menu
 * @param {BlockEditorSettings} props.settings - Settings
 */
declare function WritingMenu({ onClose, settings }: {
    onClose: OnClose;
    settings: BlockEditorSettings;
}): JSX.Element | null;
//# sourceMappingURL=writing-menu.d.ts.map