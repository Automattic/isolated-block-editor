export default MoreMenu;
export type BlockEditorSettings = import('../../../index').BlockEditorSettings;
/**
 * Close dropdown callback
 */
export type OnClose = () => any;
/**
 * More menu render callback
 */
export type OnMore = (settings: BlockEditorSettings, onClose: OnClose) => any;
/**
 * More menu
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */
declare function MoreMenu({ settings, onClick, renderMoreMenu }: {
    settings: BlockEditorSettings;
    onClick: OnClose;
    renderMoreMenu: OnMore;
}): JSX.Element;
//# sourceMappingURL=index.d.ts.map