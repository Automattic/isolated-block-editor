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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
    /**
     * - whether the editor canvas is an iframe
     */
    isIframePreview: boolean;
} | {
    isIframePreview: any;
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
    /**
     * - editor canvas styles
     */
    canvasStyles: any;
};
//# sourceMappingURL=reducer.d.ts.map