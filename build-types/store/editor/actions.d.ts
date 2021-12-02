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
     * @param {boolean} name
     */
    function setIsInserterOpened(isOpen: any): {
        type: string;
        isOpen: any;
    };
    /**
     * Mark the block inserter as open or closed
     * @param {boolean} name
     */
    function setIsInserterOpened(isOpen: any): {
        type: string;
        isOpen: any;
    };
    /**
     * Set the current device type
     * @param {string} deviceType 'Mobile', 'Desktop', or 'Tablet'
     */
    function setDeviceType(deviceType: string): {
        type: string;
        deviceType: string;
    };
    /**
     * Set the current device type
     * @param {string} deviceType 'Mobile', 'Desktop', or 'Tablet'
     */
    function setDeviceType(deviceType: string): {
        type: string;
        deviceType: string;
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
     * Open the named sidebar
     * @param {string} name Name of sidebar section
     */
    function openGeneralSidebar(name: string): Generator<any, void, unknown>;
    /**
     * Open the named sidebar
     * @param {string} name Name of sidebar section
     */
    function openGeneralSidebar(name: string): Generator<any, void, unknown>;
    /**
     * Close the sidebar (or popover)
     */
    function closeGeneralSidebar(): Generator<any, void, unknown>;
    /**
     * Close the sidebar (or popover)
     */
    function closeGeneralSidebar(): Generator<any, void, unknown>;
    /**
     * Set the status of the listview sidebar section
     * @param {boolean} isOpen
     */
    function setIsListViewOpened(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
    /**
     * Set the status of the listview sidebar section
     * @param {boolean} isOpen
     */
    function setIsListViewOpened(isOpen: boolean): {
        type: string;
        isOpen: boolean;
    };
}
//# sourceMappingURL=actions.d.ts.map