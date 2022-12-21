export default storeConfig;
declare function storeConfig(preferencesKey: any, defaultPreferences: any): {
    reducer: import("redux").Reducer<import("redux").CombinedState<{
        blocks: import("redux-undo").StateWithHistory<{
            editCount: number;
            blocks: any;
            selection: any;
        }>;
        editor: {
            patterns: any;
            currentPattern: any;
            ignoredContent: string[];
            gutenbergTemplate: any;
            settings: any;
            /**
             * - whether in visual or code editing mode.
             */
            editorMode: import("./editor/reducer").EditorMode;
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
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
            /**
             * - array of patterns.
             */
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
            /**
             * - whether the inserter is open.
             */
            isInserterOpened: boolean;
            /**
             * - array of patterns.
             */
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
            /**
             * - array of patterns.
             */
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
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
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
            /**
             * - is the editor ready?
             */
            isReady: boolean;
            /**
             * - editor settings
             */
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
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
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
            /**
             * - is this editor being used?
             */
            isEditing: boolean;
            /**
             * - editor settings
             */
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
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
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
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
            editorMode: import("./editor/reducer").EditorMode;
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
            patterns: import("./editor/reducer").Pattern[];
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
            gutenbergTemplate: any;
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
            settings: import("..").IsoSettings;
            /**
             * - current device type
             */
            deviceType: string;
            /**
             * - editor canvas styles
             */
            canvasStyles: any;
        };
        preferences: any;
        options: {};
        collab: {};
        collabPeers: any;
    }>, any>;
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
        setCanvasStyles(canvasStyles: string): {
            type: string;
            canvasStyles: string;
        };
        setIsIframePreview(isIframePreview: boolean): {
            type: string;
            isIframePreview: boolean;
        };
        setEditing(isEditing: boolean): {
            type: string;
            isEditing: boolean;
        };
        openGeneralSidebar(name: string): Generator<Object, void, unknown>;
        closeGeneralSidebar(): Generator<Object, void, unknown>;
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
        getCanvasStyles(state: {
            editor: import("./editor/reducer").EditorState;
        }): any;
        isIframePreview(state: {
            editor: import("./editor/reducer").EditorState;
        }): boolean;
        isEditorSidebarOpened: Function;
        /**
         * Internal dependencies
         */
        getBlocks(state: any): any[];
        getEditorSelection(state: any): any;
        hasEditorUndo(state: any): boolean;
        hasEditorRedo(state: any): boolean;
        getEditCount(state: any): number;
    };
    controls: {
        [x: number]: Function;
        UPDATE_BLOCKS_WITH_UNDO: Function;
        UPDATE_BLOCKS_WITHOUT_UNDO: Function;
    };
    persist: string[];
    initialState: {
        preferences: any;
    };
};
//# sourceMappingURL=index.d.ts.map