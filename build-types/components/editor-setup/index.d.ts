/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/**
 * Settings callback
 *
 * @callback OnSettings
 * @param {BlockEditorSettings} settings
 */
/**
 * Sets up Gutenberg and the Isolated Block Editor
 *
 * An initial setup is performed, and is then reset each time the editor is focussed. This ensures we are applying the right
 * settings for this particular editor.
 *
 * @param {BlockEditorSettings} settings - Settings
 */
export default function useEditorSetup(settings: BlockEditorSettings): import("../../index").BlockEditorSettings;
export type BlockEditorSettings = import('../../index').BlockEditorSettings;
/**
 * Settings callback
 */
export type OnSettings = (settings: BlockEditorSettings) => any;
//# sourceMappingURL=index.d.ts.map