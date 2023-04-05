"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _blocks = require("@wordpress/blocks");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
var getPattern = function getPattern(patterns, currentPattern) {
  return patterns && patterns.find(function (item) {
    return item.name === currentPattern;
  });
};

/** @typedef {import('../../index').IsoSettings} IsoSettings */

/**
 * Pattern type.
 *
 * @typedef Pattern
 * @property {string} name - Name of the pattern.
 * @property {string} content - Content for the pattern.
 */

/**
 * Editor mode
 *
 * @typedef {('visual'|'text')} EditorMode
 */

/**
 * The editor state object
 *
 * @typedef EditorState
 * @property {EditorMode} editorMode - whether in visual or code editing mode.
 * @property {boolean} isInserterOpened - whether the inserter is open.
 * @property {boolean} isListViewOpened - whether the list view is open.
 * @property {Pattern[]} patterns - array of patterns.
 * @property {string|null} currentPattern - current pattern name.
 * @property {string[]} ignoredContent - content to ignore when saving.
 * @property {object|null} gutenbergTemplate - the Gutenberg template
 * @property {boolean} isEditing - is this editor being used?
 * @property {boolean} isReady - is the editor ready?
 * @property {IsoSettings} settings - editor settings
 * @property {string} deviceType - current device type
 * @property {Object} canvasStyles - editor canvas styles
 * @property {boolean} isIframePreview - whether the editor canvas is an iframe
 */

/** @type EditorState */
var DEFAULT_STATE = {
  // Editor state
  editorMode: 'visual',
  isInserterOpened: false,
  isEditing: false,
  isListViewOpened: false,
  isReady: false,
  patterns: [],
  currentPattern: null,
  gutenbergTemplate: null,
  ignoredContent: [],
  deviceType: 'Desktop',
  canvasStyles: null,
  isIframePreview: false,
  settings: {
    preferencesKey: null,
    persistenceKey: null,
    blocks: {
      allowBlocks: [],
      disallowBlocks: []
    },
    disallowEmbed: [],
    customStores: [],
    toolbar: {
      inserter: true,
      undo: true,
      inspector: true,
      navigation: false,
      documentInspector: false,
      selectorTool: false
    },
    sidebar: {
      inspector: false,
      inserter: false
    },
    moreMenu: {
      editor: false,
      fullscreen: false,
      preview: false,
      topToolbar: false
    },
    linkMenu: [],
    currentPattern: null,
    patterns: [],
    defaultPreferences: {},
    allowApi: false,
    disableCanvasAnimations: false
  }
};

/**
 * Ignored content are pieces of HTML that we don't need to save. This could be, for example, an empty pattern.
 *
 * @param {Pattern[]} patterns - Array of patterns.
 * @param {string} currentPattern - Selected pattern name.
 * @param {object|null} gutenbergTemplate - Gutenberg template.
 * @return {string[]} Array of ignored HTML strings.
 */
function getIgnoredContent(patterns, currentPattern, gutenbergTemplate) {
  var ignored = [(0, _blocks.serialize)((0, _blocks.createBlock)('core/paragraph')), (0, _blocks.serialize)((0, _blocks.createBlock)('core/paragraph', {
    className: ''
  }))];
  var found = getPattern(patterns, currentPattern);

  // If we're using a starter pattern then add the empty pattern to our ignored content list
  if (found) {
    // We parse and then serialize so it will better match the formatting from Gutenberg when saving content
    ignored.push((0, _blocks.serialize)((0, _blocks.parse)(found.content)));
  }

  // If we're using a Gutenberg template then add that to the ignored list
  if (gutenbergTemplate) {
    ignored.push((0, _blocks.serialize)((0, _blocks.synchronizeBlocksWithTemplate)([], gutenbergTemplate)));
  }
  return ignored;
}
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'SETUP_EDITOR':
      {
        var _action$settings$iso = action.settings.iso,
          currentPattern = _action$settings$iso.currentPattern,
          patterns = _action$settings$iso.patterns;
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: patterns,
          currentPattern: currentPattern,
          ignoredContent: getIgnoredContent(patterns, currentPattern, action.settings.editor.template),
          gutenbergTemplate: action.settings.editor.template,
          settings: _objectSpread(_objectSpread({}, state.settings), action.settings.iso)
        });
      }
    case 'SET_CURRENT_PATTERN':
      return _objectSpread(_objectSpread({}, state), {}, {
        currentPattern: action.pattern,
        ignoredContent: getIgnoredContent(state.patterns, action.pattern, state.gutenbergTemplate)
      });
    case 'SET_EDITOR_MODE':
      return _objectSpread(_objectSpread({}, state), {}, {
        editorMode: action.editorMode
      });
    case 'SET_INSERTER_OPEN':
      return _objectSpread(_objectSpread({}, state), {}, {
        isInserterOpened: action.isOpen,
        isInspectorOpened: false,
        isListViewOpened: false
      });
    case 'SET_INSPECTOR_OPEN':
      return _objectSpread(_objectSpread({}, state), {}, {
        isInspectorOpened: action.isOpen,
        isListViewOpened: false
      });
    case 'SET_LISTVIEW_OPEN':
      return _objectSpread(_objectSpread({}, state), {}, {
        isInserterOpened: false,
        isInspectorOpened: false,
        isListViewOpened: action.isOpen
      });
    case 'SET_EDITING':
      return _objectSpread(_objectSpread({}, state), {}, {
        isEditing: action.isEditing
      });
    case 'SET_EDITOR_READY':
      return _objectSpread(_objectSpread({}, state), {}, {
        isReady: action.isReady
      });
    case 'SET_DEVICE_TYPE':
      return _objectSpread(_objectSpread({}, state), {}, {
        deviceType: action.deviceType
      });
    case 'SET_CANVAS_STYLES':
      return _objectSpread(_objectSpread({}, state), {}, {
        canvasStyles: action.canvasStyles
      });
    case 'SET_IFRAME_PREVIEW':
      return _objectSpread(_objectSpread({}, state), {}, {
        isIframePreview: action.isIframePreview
      });
  }
  return state;
};
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map