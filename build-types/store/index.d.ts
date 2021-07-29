export default storeConfig;
declare function storeConfig(preferencesKey: any, defaultPreferences: any): {
    reducer: any;
    actions: {
        toggleFeature(feature: string): {
            type: string;
            feature: string;
        };
        toggleOption(option: string): {
            type: string;
            option: string;
        };
        setReady(isReady: boolean): {
            type: string;
            isReady: boolean;
        };
        setEditorMode(editorMode: import("./editor/reducer").EditorMode): {
            type: string;
            editorMode: import("./editor/reducer").EditorMode;
        };
        setupEditor(settings: import("..").BlockEditorSettings): {
            type: string;
            settings: import("..").BlockEditorSettings;
        };
        setCurrentPattern(pattern: string): {
            type: string;
            pattern: string;
        };
        setIsInserterOpened(isOpen: boolean): {
            type: string;
            isOpen: boolean;
        };
        setEditing(isEditing: boolean): {
            type: string;
            isEditing: boolean;
        };
        setInspecting(isOpen: boolean): {
            type: string;
            isOpen: boolean;
        };
        undo(): import("redux").Action<any>;
        redo(): import("redux").Action<any>;
        updateBlocksWithUndo(blocks: any[], options?: any): any;
        updateBlocksWithoutUndo(blocks: any[], options?: any): any;
    };
    selectors: {
        /**
         * WordPress dependencies
         */
        isOptionActive(state: any, option: string): boolean;
        /**
         * WordPress dependencies
         */
        isFeatureActive(state: any, feature: string): any;
        /**
         * WordPress dependencies
         */
        getEditorMode(state: {
            editor: import("./editor/reducer").EditorState;
        }): import("./editor/reducer").EditorMode;
        getEditorSettings(state: {
            editor: import("./editor/reducer").EditorState;
        }): import("..").IsoSettings;
        isEditorReady(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        getCurrentPatternName(state: {
            editor: import("./editor/reducer").EditorState;
        }): string | null;
        getCurrentPattern(state: {
            editor: import("./editor/reducer").EditorState;
        }): import("./editor/reducer").Pattern | null;
        getIgnoredContent(state: {
            editor: import("./editor/reducer").EditorState;
        }): string[];
        getNamedPattern(state: {
            editor: import("./editor/reducer").EditorState;
        }, patternName: any): import("./editor/reducer").Pattern | null;
        isInserterOpened(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        isInspecting(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        isEditing(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        getPatterns(state: {
            editor: import("./editor/reducer").EditorState;
        }): import("./editor/reducer").Pattern[];
        getBlocks(state: any): any[];
        getEditorSelection(state: any): any;
        hasEditorUndo(state: any): boolean;
        hasEditorRedo(state: any): boolean;
        getEditCount(state: any): number;
    };
    persist: string[];
    initialState: {
        preferences: any;
    };
};
//# sourceMappingURL=index.d.ts.map