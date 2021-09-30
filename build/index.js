"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeEditor = initializeEditor;
exports.initializeIsoEditor = initializeIsoEditor;
Object.defineProperty(exports, "DocumentSection", {
  enumerable: true,
  get: function get() {
    return _document["default"];
  }
});
Object.defineProperty(exports, "ToolbarSlot", {
  enumerable: true,
  get: function get() {
    return _slot["default"];
  }
});
Object.defineProperty(exports, "CollaborativeEditing", {
  enumerable: true,
  get: function get() {
    return _collaborativeEditing["default"];
  }
});
Object.defineProperty(exports, "EditorLoaded", {
  enumerable: true,
  get: function get() {
    return _editorLoaded["default"];
  }
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _mediaUtils = require("@wordpress/media-utils");

var _blockLibrary = require("@wordpress/block-library");

var _hooks = require("@wordpress/hooks");

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

var _collaborativeEditing = _interopRequireDefault(require("./components/collaborative-editing"));

var _editorLoaded = _interopRequireDefault(require("./components/editor-loaded"));

require("./store/edit-post");

require("./style.scss");

var _excluded = ["children", "onSaveContent", "onSaveBlocks", "settings"];
import { createElement } from "@wordpress/element";

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
function initializeEditor() {
  if (window.isoInitialised) {
    return;
  } // Register all core blocks


  (0, _blockLibrary.registerCoreBlocks)();
  window.isoInitialised = true;
}

function initializeIsoEditor() {
  if (window.isoInitialisedBlocks) {
    return;
  }

  initializeEditor(); // This allows the editor to swap stores dynamically

  (0, _data.use)(_storeHotSwap["default"], {}); // This is needed for the media uploader

  (0, _hooks.addFilter)('editor.MediaUpload', 'isolated-block-editor/media-upload', function () {
    return _mediaUtils.MediaUpload;
  });
  (0, _apiFetch["default"])(); // Don't run this again

  window.isoInitialisedBlocks = true;
}
/**
 * Save blocks callback
 * @callback OnSaveBlocks
 * @param {object[]} blocks - Editor content to save
 * @param {string[]} ignoredContent - Possible content to ignore
 */

/**
 * Save HTML content callback
 * @callback OnSaveContent
 * @param {string} content - Serialized content
 */

/**
 * Parser callback
 * @callback OnParse
 * @param {string} content - HTML content
 * @returns {object[]}
 */

/**
 * Initial load blocks callback
 * @callback OnLoad
 * @param {OnParse} parse - Current block parser
 * @param {OnParse} rawHandler - Current raw handler
 * @returns {object[]}
 */

/**
 * Error callback
 * @callback OnError
 */

/**
 * Isolated block editor component.
 *
 * This wraps up the Gutenberg editor along with a customised store. The contents of the editor are unique, and multiple instances
 * can be created.
 *
 * @param {object} props - Component props
 * @param {OnSaveBlocks} [props.onSaveBlocks] - Save callback
 * @param {OnSaveContent} [props.onSaveContent] - Save callback
 * @param {OnError} props.onError - Error callback
 * @param {OnLoad} [props.onLoad] - Initial blocks
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {object} props.children - Child content
 * @param {string} [props.className] - Additional class name
 * @param {OnMore} [props.renderMoreMenu] - Callback to render additional items in the more menu
 */


function IsolatedBlockEditor(props) {
  var children = props.children,
      onSaveContent = props.onSaveContent,
      onSaveBlocks = props.onSaveBlocks,
      settings = props.settings,
      params = (0, _objectWithoutProperties2["default"])(props, _excluded);
  initializeIsoEditor();
  return createElement(_element.StrictMode, null, createElement(_keyboardShortcuts.ShortcutProvider, null, createElement(_contentSaver["default"], {
    onSaveBlocks: onSaveBlocks,
    onSaveContent: onSaveContent
  }), createElement(_editorSetup["default"], {
    settings: settings
  }), createElement(_patternMonitor["default"], null), createElement(_components.SlotFillProvider, null, createElement(_blockEditorContainer["default"], (0, _extends2["default"])({}, params, {
    settings: settings
  }), children))));
}

var _default = (0, _withRegistryProvider["default"])(IsolatedBlockEditor);

exports["default"] = _default;
//# sourceMappingURL=index.js.map