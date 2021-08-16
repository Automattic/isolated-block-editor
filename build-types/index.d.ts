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
 * Isolated Editor Settings
 * @typedef IsoSettings
 * @property {string|null} [preferencesKey] - Preferences key. Set to null to disable
 * @property {string|null} [persistenceKey] - Persistence key. Set to null to disable
 * @property {{allowBlocks: string[], disallowBlocks: string[]}} [blocks] - Block restrictions
 * @property {string[]} [disallowEmbed] - List of embed names to remove
 * @property {object[]} [customStores] - Array of custom stores
 * @property {ToolbarSettings} [toolbar] - Toolbar settings
 * @property {MoreMenuSettings|false} [moreMenu] - More menu settings, or false to disable
 * @property {{title: string, url: string}[]} [linkMenu] - Link menu settings
 * @property {string|null} [currentPattern] - The pattern to start with
 * @property {Pattern[]} [patterns] - List of patterns
 * @property {object} [defaultPreferences] - Default preferences if nothing in localStorage
 * @property {boolean} [allowApi] - Allow API requests
 */
/**
 * Block Editor Settings
 * @typedef BlockEditorSettings
 * @property {IsoSettings} [iso] - Isolated editor settings
 * @property {EditorSettings} [editor] - Gutenberg editor settings
 * @property {CollaborationSettings} [collab] - Real-time collaboration settings
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
 * Real-time collaboration settings
 * @typedef CollaborationSettings
 * @property {boolean} [enabled]
 * @property {string} [channelId] Optional channel id to pass to transport.connect().
 * @property {string} username Name displayed to peers. Required if collab is enabled.
 * @property {string} [caretColor] Color of the caret indicator displayed to peers. If unspecified, a random color will be selected.
 * @property {CollaborationTransport} transport Required if collab is enabled.
 */
/**
 * Transport module for real-time collaboration
 * @typedef CollaborationTransport
 * @property {(message: CollaborationTransportDocMessage|CollaborationTransportSelectionMessage) => void} sendMessage
 * @property {(options: CollaborationTransportConnectOpts) => Promise<{isFirstInChannel: boolean}>} connect
 * @property {() => Promise<void>} disconnect
 *
 * @typedef CollaborationTransportConnectOpts
 * @property {object} user
 * @property {string} user.identity
 * @property {string} user.name
 * @property {string} [user.color] Color of the caret indicator displayed to peers.
 * @property {(message: object) => void} onReceiveMessage Callback to run when a message is received.
 * @property {(peers: AvailablePeer[]) => void} setAvailablePeers Callback to run when peers change.
 * @property {string} [channelId]
 *
 * @typedef AvailablePeer
 * @property {string} id
 * @property {string} name
 * @property {string} color
 *
 * @typedef CollaborationTransportDocMessage
 * @property {string} identity
 * @property {'doc'} type
 * @property {object} message
 *
 * @typedef CollaborationTransportSelectionMessage
 * @property {string} identity
 * @property {'selection'} type
 * @property {EditorSelection} selection
 *
 * @typedef EditorSelection
 * @property {object} start
 * @property {object} end
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
    /**
     * - Real-time collaboration settings
     */
    collab?: CollaborationSettings | undefined;
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
 * Real-time collaboration settings
 */
export type CollaborationSettings = {
    enabled?: boolean | undefined;
    /**
     * Optional channel id to pass to transport.connect().
     */
    channelId?: string | undefined;
    /**
     * Name displayed to peers. Required if collab is enabled.
     */
    username: string;
    /**
     * Color of the caret indicator displayed to peers. If unspecified, a random color will be selected.
     */
    caretColor?: string | undefined;
    /**
     * Required if collab is enabled.
     */
    transport: CollaborationTransport;
};
/**
 * Transport module for real-time collaboration
 */
export type CollaborationTransport = {
    sendMessage: (message: CollaborationTransportDocMessage | CollaborationTransportSelectionMessage) => void;
    connect: (options: CollaborationTransportConnectOpts) => Promise<{
        isFirstInChannel: boolean;
    }>;
    disconnect: () => Promise<void>;
};
/**
 * Transport module for real-time collaboration
 */
export type CollaborationTransportConnectOpts = {
    user: {
        identity: string;
        name: string;
        color?: string | undefined;
    };
    /**
     * Callback to run when a message is received.
     */
    onReceiveMessage: (message: object) => void;
    /**
     * Callback to run when peers change.
     */
    setAvailablePeers: (peers: AvailablePeer[]) => void;
    channelId?: string | undefined;
};
/**
 * Transport module for real-time collaboration
 */
export type AvailablePeer = {
    id: string;
    name: string;
    color: string;
};
/**
 * Transport module for real-time collaboration
 */
export type CollaborationTransportDocMessage = {
    identity: string;
    type: 'doc';
    message: object;
};
/**
 * Transport module for real-time collaboration
 */
export type CollaborationTransportSelectionMessage = {
    identity: string;
    type: 'selection';
    selection: EditorSelection;
};
/**
 * Transport module for real-time collaboration
 */
export type EditorSelection = {
    start: object;
    end: object;
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
export type OnLoad = (parse: OnParse, rawHandler: OnParse) => object[];
/**
 * Error callback
 */
export type OnError = () => any;
import EditorLoaded from "./components/editor-loaded";
import DocumentSection from "./components/document";
import ToolbarSlot from "./components/block-editor-toolbar/slot";
export { EditorLoaded, DocumentSection, ToolbarSlot };
//# sourceMappingURL=index.d.ts.map