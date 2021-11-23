export default storeConfig;
declare function storeConfig(preferencesKey: any, defaultPreferences: any): {
    reducer: any;
    actions: {
        setAvailablePeers: typeof import("./peers/actions").setAvailablePeers;
        setPeerSelection: typeof import("./peers/actions").setPeerSelection;
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
        setIsInserterOpened(isOpen: any): {
            type: string;
            isOpen: any;
        };
        setEditing(isEditing: boolean): {
            type: string;
            isEditing: boolean;
        };
        openGeneralSidebar(name: string): Generator<any, void, unknown>;
        closeGeneralSidebar(): Generator<any, void, unknown>;
        setIsListViewOpened(isOpen: boolean): {
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
        getPeers(state: any): any;
        hasPeers(state: any): boolean;
        /**
         * WordPress dependencies
         */
        isOptionActive(state: any, option: string): boolean;
        /**
         * WordPress dependencies
         */
        isFeatureActive(state: any, feature: string): any;
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
        isEditing(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        getPatterns(state: {
            editor: import("./editor/reducer").EditorState;
        }): import("./editor/reducer").Pattern[];
        isListViewOpened(state: any): any;
        isEditorSidebarOpened: any;
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