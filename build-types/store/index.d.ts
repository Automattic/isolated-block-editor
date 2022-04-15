export default storeConfig;
declare function storeConfig(preferencesKey: any, defaultPreferences: any): {
    reducer: any;
    actions: {
        /**
         * WordPress dependencies
         */
        setAvailableCollabPeers(peers: import("../components/collaborative-editing").AvailablePeer[]): {
            type: string;
            peers: import("../components/collaborative-editing").AvailablePeer[];
        };
        setCollabPeerSelection(peerId: string, selection: import("../components/collaborative-editing").EditorSelection): {
            type: string;
            peerId: string;
            selection: import("../components/collaborative-editing").EditorSelection;
        };
        /**
         * WordPress dependencies
         */
        setYDoc(doc: any): {
            type: string;
            doc: any;
        };
        /**
         * Internal dependencies
         */
        setUndoManager(undoManager: any): {
            type: string;
            undoManager: any;
        };
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
        setDeviceType(deviceType: string): {
            type: string;
            deviceType: string;
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
        undo(): Generator<import("redux").Action<any>, any, unknown>;
        redo(): Generator<import("redux").Action<any>, any, unknown>;
        updateBlocksWithUndo(blocks: any[], options?: any): Generator<any, any, unknown>;
        updateBlocksWithoutUndo(blocks: any[], options?: any): Generator<any, any, unknown>;
    };
    selectors: {
        /**
         * WordPress dependencies
         */
        getCollabPeers(state: any): any;
        hasCollabPeers(state: any): boolean;
        /**
         * WordPress dependencies
         */
        getYDoc(state: any): any;
        getUndoManager(state: any): any;
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
        isListViewOpened(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        getPreviewDeviceType(state: {
            editor: import("./editor/reducer").EditorState;
        }): string;
        isEditorSidebarOpened: any;
        getBlocks(state: any): any[];
        getEditorSelection(state: any): any;
        hasEditorUndo(state: any): boolean;
        hasEditorRedo(state: any): boolean;
        getEditCount(state: any): number;
    };
    controls: {
        [x: number]: any;
        UPDATE_BLOCKS_WITH_UNDO: any;
        UPDATE_BLOCKS_WITHOUT_UNDO: any;
    };
    persist: string[];
    initialState: {
        preferences: any;
    };
};
//# sourceMappingURL=index.d.ts.map