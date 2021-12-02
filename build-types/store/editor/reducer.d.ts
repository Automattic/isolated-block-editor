export default reducer;
export type IsoSettings = import('../../index').IsoSettings;
/**
 * Pattern type.
 */
export type Pattern = {
    /**
     * - Name of the pattern.
     */
    name: string;
    /**
     * - Content for the pattern.
     */
    content: string;
};
/**
 * Editor mode
 */
export type EditorMode = ('visual' | 'text');
/**
 * The editor state object
 */
export type EditorState = {
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
};
declare function reducer(state: EditorState | undefined, action: any): {
    patterns: any;
    currentPattern: any;
    ignoredContent: string[];
    gutenbergTemplate: any;
    settings: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    editorMode: any;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    isInserterOpened: any;
    isInspectorOpened: boolean;
    isListViewOpened: boolean;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    isInspectorOpened: any;
    isListViewOpened: boolean;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    isInserterOpened: boolean;
    isInspectorOpened: boolean;
    isListViewOpened: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    isEditing: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    isReady: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
    /**
     * - current device type
     */
    deviceType: string;
} | {
    deviceType: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open.
     */
    isInserterOpened: boolean;
    /**
     * - whether the list view is open.
     */
    isListViewOpened: boolean;
    /**
     * - array of patterns.
     */
    patterns: Pattern[];
    /**
     * - current pattern name.
     */
    currentPattern: string | null;
    /**
     * - content to ignore when saving.
     */
    ignoredContent: string[];
    /**
     * - the Gutenberg template
     */
    gutenbergTemplate: object | null;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
};
//# sourceMappingURL=reducer.d.ts.map