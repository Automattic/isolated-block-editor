/** @typedef {import('./components/block-editor-toolbar/more-menu').OnMore} OnMore */
/** @typedef {import('./store/editor/reducer').Pattern} Pattern */
/**
 * Toolbar settings
 * @typedef ToolbarSettings
 * @property {boolean} [inserter] - Enable or disable the toolbar block inserter
 * @property {boolean} [inspector] - Enable or disable the toolbar block inspector
 * @property {boolean} [navigation] - Enable or disable the toolbar navigation button
 * @property {boolean} [toc] - Enable or disable the toolbar table of contents button
 * @property {boolean} [undo] - Enable or disable the toolbar undo/redo buttons
 * @property {boolean} [selectorTool] - Enable or disable the selector tool
 * @property {boolean} [documentInspector] - Enable or disable the document inspector
 */
/**
 * More menu settings
 * @typedef MoreMenuSettings
 * @property {boolean} [editor] - Enable or disable the editor sub menu (visual/code editing)
 * @property {boolean} [fullscreen] - Enable or disable the fullscreen option
 * @property {boolean} [preview] - Enable or disable the preview option
 * @property {boolean} [topToolbar] - Enable or disable the 'top toolbar' option
 */
/**
 * Sidebar settings
 * @typedef SidebarSettings
 * @property {boolean} [inspector=false] - Display the block inspector in a sidebar (true) or popover (false)
 * @property {boolean} [inserter=false] - Display the block inserter in a sidebar (true) or popover (false)
 */
/**
 * Isolated Editor Settings
 * @typedef IsoSettings
 * @property {string|null} [preferencesKey] - Preferences key. Set to null to disable
 * @property {string|null} [persistenceKey] - Persistence key. Set to null to disable
 * @property {{allowBlocks: string[], disallowBlocks: string[]}} [blocks] - Block restrictions
 * @property {string[]} [disallowEmbed] - List of embed names to remove
 * @property {object[]} [customStores] - Array of custom stores
 * @property {boolean} [footer] - Show footer component
 * @property {ToolbarSettings} [toolbar] - Toolbar settings
 * @property {MoreMenuSettings|false} [moreMenu] - More menu settings, or false to disable
 * @property {{title: string, url: string}[]} [linkMenu] - Link menu settings
 * @property {string|null} [currentPattern] - The pattern to start with
 * @property {Pattern[]} [patterns] - List of patterns
 * @property {object} [defaultPreferences] - Default preferences if nothing in localStorage
 * @property {boolean} [allowApi] - Allow API requests
 * @property {SidebarSettings} [sidebar] - Configure sidebar functionality
 */
/**
 * Block Editor Settings
 * @typedef BlockEditorSettings
 * @property {IsoSettings} [iso] - Isolated editor settings
 * @property {EditorSettings} [editor] - Gutenberg editor settings
 */
/**
 * Gutenberg Editor Settings - this isn't the complete object, but just enough for linting here
 * @typedef EditorSettings
 * @property {boolean} hasUploadPermissions
 * @property {object} allowedMimeTypes
 * @property {string[]} allowedBlockTypes
 * @property {boolean} hasFixedToolbar
 * @property {null|object} mediaUpload
 * @property {object[]|null} template
 * @property {null} templateLock
 * @property {object[]} reusableBlocks
 */
/**
 * Initialize Gutenberg
 */
export function initializeEditor(): void;
export function initializeIsoEditor(): void;
declare var _default: import("react").ComponentType<any>;
export default _default;
export type OnMore = import('./components/block-editor-toolbar/more-menu').OnMore;
export type Pattern = import('./store/editor/reducer').Pattern;
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
     * - Enable or disable the toolbar table of contents button
     */
    toc?: boolean | undefined;
    /**
     * - Enable or disable the toolbar undo/redo buttons
     */
    undo?: boolean | undefined;
    /**
     * - Enable or disable the selector tool
     */
    selectorTool?: boolean | undefined;
    /**
     * - Enable or disable the document inspector
     */
    documentInspector?: boolean | undefined;
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
    patterns?: import("./store/editor/reducer").Pattern[] | undefined;
    /**
     * - Default preferences if nothing in localStorage
     */
    defaultPreferences?: object;
    /**
     * - Allow API requests
     */
    allowApi?: boolean | undefined;
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
    allowedMimeTypes: object;
    allowedBlockTypes: string[];
    hasFixedToolbar: boolean;
    mediaUpload: null | object;
    template: object[] | null;
    templateLock: null;
    reusableBlocks: object[];
};
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
import EditorLoaded from "./components/editor-loaded";
import DocumentSection from "./components/document";
import ToolbarSlot from "./components/block-editor-toolbar/slot";
import CollaborativeEditing from "./components/collaborative-editing";
import FooterSlot from "./components/footer-slot";
export { EditorLoaded, DocumentSection, ToolbarSlot, CollaborativeEditing, FooterSlot };
//# sourceMappingURL=index.d.ts.map