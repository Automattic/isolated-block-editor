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
     * - whether the inserter is open
     */
    isInserterOpened: boolean;
    /**
     * - whether the block inspector is open
     */
    isInspecting: boolean;
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
     * - whether the inserter is open
     */
    isInserterOpened: boolean;
    /**
     * - whether the block inspector is open
     */
    isInspecting: boolean;
    /**
     * - is this editor being used?
     */
    isEditing: boolean;
    /**
     * - is the editor ready?
     */
    isReady: boolean;
} | {
    editorMode: any;
    isInspecting: boolean;
    /**
     * - whether the inserter is open
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
} | {
    isInserterOpened: any;
    isInspecting: boolean;
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
} | {
    isInspecting: any;
    isInserterOpened: boolean;
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
} | {
    isEditing: any;
    isInspecting: boolean;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open
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
     * - is the editor ready?
     */
    isReady: boolean;
    /**
     * - editor settings
     */
    settings: IsoSettings;
} | {
    isReady: any;
    /**
     * - whether in visual or code editing mode.
     */
    editorMode: EditorMode;
    /**
     * - whether the inserter is open
     */
    isInserterOpened: boolean;
    /**
     * - whether the block inspector is open
     */
    isInspecting: boolean;
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
};
//# sourceMappingURL=reducer.d.ts.map