"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActionArea", {
  enumerable: true,
  get: function get() {
    return _actionArea["default"];
  }
});
Object.defineProperty(exports, "DocumentSection", {
  enumerable: true,
  get: function get() {
    return _document["default"];
  }
});
Object.defineProperty(exports, "EditorHeadingSlot", {
  enumerable: true,
  get: function get() {
    return _editorHeadingSlot["default"];
  }
});
Object.defineProperty(exports, "EditorLoaded", {
  enumerable: true,
  get: function get() {
    return _editorLoaded["default"];
  }
});
Object.defineProperty(exports, "FooterSlot", {
  enumerable: true,
  get: function get() {
    return _footerSlot["default"];
  }
});
Object.defineProperty(exports, "ToolbarSlot", {
  enumerable: true,
  get: function get() {
    return _slot["default"];
  }
});
exports["default"] = void 0;
exports.initializeEditor = initializeEditor;
exports.useInitializeIsoEditor = useInitializeIsoEditor;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
require("@wordpress/editor");
var _element = require("@wordpress/element");
var _components = require("@wordpress/components");
var _blockLibrary = require("@wordpress/block-library");
var _data = require("@wordpress/data");
require("@wordpress/format-library");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _blockEditorContainer = _interopRequireDefault(require("./components/block-editor-container"));
var _withRegistryProvider = _interopRequireDefault(require("./components/with-registry-provider"));
var _editorSetup = _interopRequireDefault(require("./components/editor-setup"));
var _patternMonitor = _interopRequireDefault(require("./components/pattern-monitor"));
var _contentSaver = _interopRequireDefault(require("./components/content-saver"));
var _apiFetch = _interopRequireDefault(require("./components/api-fetch"));
var _storeHotSwap = _interopRequireDefault(require("./store/plugins/store-hot-swap"));
var _document = _interopRequireDefault(require("./components/document"));
var _slot = _interopRequireDefault(require("./components/block-editor-toolbar/slot"));
var _actionArea = _interopRequireDefault(require("./components/action-area"));
var _footerSlot = _interopRequireDefault(require("./components/footer-slot"));
var _editorLoaded = _interopRequireDefault(require("./components/editor-loaded"));
var _editorHeadingSlot = _interopRequireDefault(require("./components/editor-heading-slot"));
require("./store/edit-post");
require("./style.scss");
var _excluded = ["children", "onSaveContent", "onSaveBlocks", "__experimentalUndoManager", "__experimentalOnInput", "__experimentalOnChange", "__experimentalValue", "__experimentalOnSelection"]; // @ts-nocheck
/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
// Export library components
// A fake edit-post store is needed
import { createElement } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
function initializeEditor() {
  if (window.isoInitialised) {
    return;
  }

  // Register all core blocks
  (0, _blockLibrary.registerCoreBlocks)();
  window.isoInitialised = true;
}
/**
 * @param {Object} props - Component props
 * @param {UndoManager} [props.undoManager]
 */
function useInitializeIsoEditor() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    undoManager = _ref.undoManager;
  if (window.isoInitialisedBlocks) {
    return;
  }
  initializeEditor();

  // This allows the editor to swap stores dynamically
  (0, _data.use)(_storeHotSwap["default"], {});
  (0, _apiFetch["default"])();

  // Don't run this again
  window.isoInitialisedBlocks = true;
}

/**
 * Save blocks callback
 *
 * @callback OnSaveBlocks
 * @param {object[]} blocks - Editor content to save
 * @param {string[]} ignoredContent - Possible content to ignore
 */

/**
 * Save HTML content callback
 *
 * @callback OnSaveContent
 * @param {string} content - Serialized content
 */

/**
 * Parser callback
 *
 * @callback OnParse
 * @param {string} content - HTML content
 * @return {object[]}
 */

/**
 * Initial load blocks callback
 *
 * @callback OnLoad
 * @param {OnParse} parse - Current block parser
 * @param {OnParse} rawHandler - Current raw handler
 * @return {object[]|Promise}
 */

/**
 * Error callback
 *
 * @callback OnError
 */

/**
 * Isolated block editor component.
 *
 * This wraps up the Gutenberg editor along with a customised store. The contents of the editor are unique, and multiple instances
 * can be created.
 *
 * @param {Object} props - Component props
 * @param {OnSaveBlocks} [props.onSaveBlocks] - Save callback
 * @param {OnSaveContent} [props.onSaveContent] - Save callback
 * @param {OnError} props.onError - Error callback
 * @param {OnLoad} [props.onLoad] - Initial blocks
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {Object} [props.children] - Child content
 * @param {string} [props.className] - Additional class name
 * @param {OnMore} [props.renderMoreMenu] - Callback to render additional items in the more menu
 * @param {UndoManager} [props.__experimentalUndoManager] - Undo manager
 * @param {OnUpdate} [props.__experimentalOnInput] - Gutenberg's onInput callback
 * @param {OnUpdate} [props.__experimentalOnChange] - Gutenberg's onChange callback
 * @param {OnSelect} [props.__experimentalOnSelection] - Callback to run when the editor selection changes
 * @param {object[]} [props.__experimentalValue] - Gutenberg's value
 */
function IsolatedBlockEditor(props) {
  var children = props.children,
    onSaveContent = props.onSaveContent,
    onSaveBlocks = props.onSaveBlocks,
    __experimentalUndoManager = props.__experimentalUndoManager,
    __experimentalOnInput = props.__experimentalOnInput,
    __experimentalOnChange = props.__experimentalOnChange,
    __experimentalValue = props.__experimentalValue,
    __experimentalOnSelection = props.__experimentalOnSelection,
    params = (0, _objectWithoutProperties2["default"])(props, _excluded);

  // This needs to happen first to setup Gutenbergy things
  useInitializeIsoEditor({
    undoManager: __experimentalUndoManager
  });
  var settings = (0, _editorSetup["default"])(props.settings);
  var editorSelection = (0, _data.useSelect)(function (select) {
    return {
      start: select('core/block-editor').getSelectionStart(),
      end: select('core/block-editor').getSelectionEnd()
    };
  }, []);
  (0, _element.useEffect)(function () {
    __experimentalOnSelection === null || __experimentalOnSelection === void 0 || __experimentalOnSelection(editorSelection);
  }, [editorSelection]);
  return createElement(_element.StrictMode, null, createElement(_contentSaver["default"], {
    onSaveBlocks: onSaveBlocks,
    onSaveContent: onSaveContent
  }), createElement(_patternMonitor["default"], null), createElement(_components.SlotFillProvider, null, createElement(_blockEditorContainer["default"], _objectSpread(_objectSpread({}, params), {}, {
    onInput: __experimentalOnInput,
    onChange: __experimentalOnChange,
    blocks: __experimentalValue,
    settings: settings
  }), children)));
}
var _default = exports["default"] = (0, _withRegistryProvider["default"])(IsolatedBlockEditor);
//# sourceMappingURL=index.js.map