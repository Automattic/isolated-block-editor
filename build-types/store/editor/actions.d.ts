export default actions;
export type BlockEditorSettings = import('../../index').BlockEditorSettings;
export type EditorMode = import('./reducer').EditorMode;
declare namespace actions {
    /**
     * Set whether the editor is ready for editing
     * @param {boolean} isReady
     */
    function setReady(isReady: boolean): {
        type: string;
        isReady: boolean;
    };
    /**
     * Set whether the editor is ready for editing
     * @param {boolean} isReady
     */
    function setReady(isReady: boolean): {
        type: string;
        isReady: boolean;
    };
    /**
     * Set the current editor mode
     * @param {EditorMode} editorMode Editor mode
     */
    function setEditorMode(editorMode: import("./reducer").EditorMode): {
        type: string;
        editorMode: import("./reducer").EditorMode;
    };
    /**
     * Set the current editor mode
     * @param {EditorMode} editorMode Editor mode
     */
    function setEditorMode(editorMode: import("./reducer").EditorMode): {
        type: string;
        editorMode: import("./reducer").EditorMode;
    };
    /**
     * Set up the editor
     * @param {BlockEditorSettings} settings
     */
    function setupEditor(settings: import("../../index").BlockEditorSettings): {
        type: string;
        settings: import("../../index").BlockEditorSettings;
    };
    /**
     * Set up the editor
     * @param {BlockEditorSettings} settings
     */
    function setupEditor(settings: import("../../index").BlockEditorSettings): {
        type: string;
        settings: import("../../index").BlockEditorSettings;
    };
    /**
     * Set the current pattern name
     * @param {string} pattern Pattern name
     */
    function setCurrentPattern(pattern: string): {
        type: string;
        pattern: string;
    };
    /**
     * Set the current pattern name
     * @param {string} pattern Pattern name
     */
    function setCurrentPattern(pattern: string): {
        type: string;
        pattern: string;
    };
    /**
     * Mark the block inserter as open or closed
     * @param {boolean} isOpen
     */
    function setIsInserterOpened(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
    /**
     * Mark the block inserter as open or closed
     * @param {boolean} isOpen
     */
    function setIsInserterOpened(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
    /**
     * Mark this editor as in-use or not
     * @param {boolean} isEditing
     */
    function setEditing(isEditing: boolean): {
        type: string;
        isEditing: boolean;
    };
    /**
     * Mark this editor as in-use or not
     * @param {boolean} isEditing
     */
    function setEditing(isEditing: boolean): {
        type: string;
        isEditing: boolean;
    };
    /**
     * Mark the block inserter as open or closed
     * @param {boolean} isOpen
     */
    function setInspecting(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
    /**
     * Mark the block inserter as open or closed
     * @param {boolean} isOpen
     */
    function setInspecting(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
}
//# sourceMappingURL=actions.d.ts.map