/** @typedef {import('./components/block-editor-toolbar/more-menu').OnMore} OnMore */
/** @typedef {import('./store/editor/reducer').Pattern} Pattern */
/** @typedef {import('./components/block-editor-contents/index').OnUpdate} OnUpdate */
/**
 * Undo Manager
 *
 * @typedef UndoManager
 * @property {Function} undo - Undo callback
 * @property {Function} redo - redoCallback
 * @property {Array} undoStack - Undo stack
 * @property {Array} redoStack - Redo stack
 */
/**
 * Toolbar settings
 *
 * @typedef ToolbarSettings
 * @property {boolean} [inserter] - Enable or disable the toolbar block inserter
 * @property {boolean} [inspector] - Enable or disable the toolbar block inspector
 * @property {boolean} [navigation] - Enable or disable the toolbar navigation button
 * @property {boolean} [undo] - Enable or disable the toolbar undo/redo buttons
 * @property {boolean} [selectorTool] - Enable or disable the selector tool
 * @property {boolean|string} [documentInspector] - Enable or disable the document inspector or enable with custom label
 */
/**
 * More menu settings
 *
 * @typedef MoreMenuSettings
 * @property {boolean} [editor] - Enable or disable the editor sub menu (visual/code editing)
 * @property {boolean} [fullscreen] - Enable or disable the fullscreen option
 * @property {boolean} [preview] - Enable or disable the preview option
 * @property {boolean} [topToolbar] - Enable or disable the 'top toolbar' option
 */
/**
 * Sidebar settings
 *
 * @typedef SidebarSettings
 * @property {boolean} [inspector=false] - Display the block inspector in a sidebar (true) or popover (false)
 * @property {boolean} [inserter=false] - Display the block inserter in a sidebar (true) or popover (false)
 * @property {function|null} [customComponent] - Function returning a custom sidebar component, or will default to the block inspector
 */
/**
 * Isolated Editor Settings
 *
 * @typedef IsoSettings
 * @property {string|null} [preferencesKey] - Preferences key. Set to null to disable
 * @property {string|null} [persistenceKey] - Persistence key. Set to null to disable
 * @property {{allowBlocks: string[], disallowBlocks: string[]}} [blocks] - Block restrictions
 * @property {string[]} [disallowEmbed] - List of embed names to remove
 * @property {object[]} [customStores] - Array of custom stores
 * @property {boolean} [footer] - Show footer component
 * @property {boolean} [header] - Show header component
 * @property {ToolbarSettings} [toolbar] - Toolbar settings
 * @property {MoreMenuSettings|false} [moreMenu] - More menu settings, or false to disable
 * @property {{title: string, url: string}[]} [linkMenu] - Link menu settings
 * @property {string|null} [currentPattern] - The pattern to start with
 * @property {Pattern[]} [patterns] - List of patterns
 * @property {Object} [defaultPreferences] - Default preferences if nothing in localStorage
 * @property {boolean} [allowApi] - Allow API requests
 * @property {boolean} [disableCanvasAnimations] - Disable editor canvas animations
 * @property {SidebarSettings} [sidebar] - Configure sidebar functionality
 */
/**
 * Block Editor Settings
 *
 * @typedef BlockEditorSettings
 * @property {IsoSettings} [iso] - Isolated editor settings
 * @property {EditorSettings} [editor] - Gutenberg editor settings
 */
/**
 * Gutenberg Editor Settings - this isn't the complete object, but just enough for linting here
 *
 * @typedef EditorSettings
 * @property {boolean} hasUploadPermissions
 * @property {Object} allowedMimeTypes
 * @property {string[]} allowedBlockTypes
 * @property {boolean} fixedToolbar
 * @property {boolean} hasFixedToolbar
 * @property {object[]|null} template
 * @property {null} templateLock
 * @property {object[]} reusableBlocks
 * @property {object[]} styles
 * @property {object[]} defaultEditorStyles
 * @property {string} bodyPlaceholder
 */
/**
 * OnSelect callback
 *
 * @callback OnSelect
 * @param {Object} selection - Editor content to save
 */
/**
 * Initialize Gutenberg
 */
export function initializeEditor(): void;
/**
 * @param {Object} props - Component props
 * @param {UndoManager} [props.undoManager]
 */
export function useInitializeIsoEditor({ undoManager }?: {
    undoManager?: UndoManager | undefined;
}): void;
declare const _default: (props: any) => JSX.Element;
export default _default;
export type OnMore = import('./components/block-editor-toolbar/more-menu').OnMore;
export type Pattern = import('./store/editor/reducer').Pattern;
export type OnUpdate = import('./components/block-editor-contents/index').OnUpdate;
/**
 * Undo Manager
 */
export type UndoManager = {
    /**
     * - Undo callback
     */
    undo: Function;
    /**
     * - redoCallback
     */
    redo: Function;
    /**
     * - Undo stack
     */
    undoStack: any[];
    /**
     * - Redo stack
     */
    redoStack: any[];
};
/**
 * Toolbar settings
 */
export type ToolbarSettings = {
    /**
     * - Enable or disable the toolbar block inserter
     */
    inserter?: boolean | undefined;
    /**
     * - Enable or disable the toolbar block inspector
     */
    inspector?: boolean | undefined;
    /**
     * - Enable or disable the toolbar navigation button
     */
    navigation?: boolean | undefined;
    /**
     * - Enable or disable the toolbar undo/redo buttons
     */
    undo?: boolean | undefined;
    /**
     * - Enable or disable the selector tool
     */
    selectorTool?: boolean | undefined;
    /**
     * - Enable or disable the document inspector or enable with custom label
     */
    documentInspector?: string | boolean | undefined;
};
/**
 * More menu settings
 */
export type MoreMenuSettings = {
    /**
     * - Enable or disable the editor sub menu (visual/code editing)
     */
    editor?: boolean | undefined;
    /**
     * - Enable or disable the fullscreen option
     */
    fullscreen?: boolean | undefined;
    /**
     * - Enable or disable the preview option
     */
    preview?: boolean | undefined;
    /**
     * - Enable or disable the 'top toolbar' option
     */
    topToolbar?: boolean | undefined;
};
/**
 * Sidebar settings
 */
export type SidebarSettings = {
    /**
     * - Display the block inspector in a sidebar (true) or popover (false)
     */
    inspector?: boolean | undefined;
    /**
     * - Display the block inserter in a sidebar (true) or popover (false)
     */
    inserter?: boolean | undefined;
    /**
     * - Function returning a custom sidebar component, or will default to the block inspector
     */
    customComponent?: Function | null | undefined;
};
/**
 * Isolated Editor Settings
 */
export type IsoSettings = {
    /**
     * - Preferences key. Set to null to disable
     */
    preferencesKey?: string | null | undefined;
    /**
     * - Persistence key. Set to null to disable
     */
    persistenceKey?: string | null | undefined;
    /**
     * - Block restrictions
     */
    blocks?: {
        allowBlocks: string[];
        disallowBlocks: string[];
    } | undefined;
    /**
     * - List of embed names to remove
     */
    disallowEmbed?: string[] | undefined;
    /**
     * - Array of custom stores
     */
    customStores?: any[] | undefined;
    /**
     * - Show footer component
     */
    footer?: boolean | undefined;
    /**
     * - Show header component
     */
    header?: boolean | undefined;
    /**
     * - Toolbar settings
     */
    toolbar?: ToolbarSettings | undefined;
    /**
     * - More menu settings, or false to disable
     */
    moreMenu?: false | MoreMenuSettings | undefined;
    /**
     * - Link menu settings
     */
    linkMenu?: {
        title: string;
        url: string;
    }[] | undefined;
    /**
     * - The pattern to start with
     */
    currentPattern?: string | null | undefined;
    /**
     * - List of patterns
     */
    patterns?: import("./components/pattern-monitor").Pattern[] | undefined;
    /**
     * - Default preferences if nothing in localStorage
     */
    defaultPreferences?: any;
    /**
     * - Allow API requests
     */
    allowApi?: boolean | undefined;
    /**
     * - Disable editor canvas animations
     */
    disableCanvasAnimations?: boolean | undefined;
    /**
     * - Configure sidebar functionality
     */
    sidebar?: SidebarSettings | undefined;
};
/**
 * Block Editor Settings
 */
export type BlockEditorSettings = {
    /**
     * - Isolated editor settings
     */
    iso?: IsoSettings | undefined;
    /**
     * - Gutenberg editor settings
     */
    editor?: EditorSettings | undefined;
};
/**
 * Gutenberg Editor Settings - this isn't the complete object, but just enough for linting here
 */
export type EditorSettings = {
    hasUploadPermissions: boolean;
    allowedMimeTypes: any;
    allowedBlockTypes: string[];
    fixedToolbar: boolean;
    hasFixedToolbar: boolean;
    template: object[] | null;
    templateLock: null;
    reusableBlocks: object[];
    styles: object[];
    defaultEditorStyles: object[];
    bodyPlaceholder: string;
};
/**
 * OnSelect callback
 */
export type OnSelect = (selection: any) => any;
/**
 * Save blocks callback
 */
export type OnSaveBlocks = (blocks: object[], ignoredContent: string[]) => any;
/**
 * Save HTML content callback
 */
export type OnSaveContent = (content: string) => any;
/**
 * Parser callback
 */
export type OnParse = (content: string) => object[];
/**
 * Initial load blocks callback
 */
export type OnLoad = (parse: OnParse, rawHandler: OnParse) => object[] | Promise<any>;
/**
 * Error callback
 */
export type OnError = () => any;
import EditorLoaded from './components/editor-loaded';
import DocumentSection from './components/document';
import ToolbarSlot from './components/block-editor-toolbar/slot';
import FooterSlot from './components/footer-slot';
import EditorHeadingSlot from './components/editor-heading-slot';
import ActionArea from './components/action-area';
export { EditorLoaded, DocumentSection, ToolbarSlot, FooterSlot, EditorHeadingSlot, ActionArea };
//# sourceMappingURL=index.d.ts.map