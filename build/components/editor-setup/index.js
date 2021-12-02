"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _i18n = require("@wordpress/i18n");

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _editorSettings = _interopRequireDefault(require("./editor-settings"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Settings callback
 * @callback OnSettings
 * @param {BlockEditorSettings} settings
 */

/**
 * Sets up Gutenberg and the Isolated Block Editor
 *
 * An initial setup is performed, and is then reset each time the editor is focussed. This ensures we are applying the right
 * settings for this particular editor.
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.currentSettings - Modified settings
 * @param {OnSettings} props.updateSettings - Update settings
 * @param {OnSettings} props.setupEditor - Set up the Gutenberg editor
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {boolean} props.topToolbar - Is the top toolbar enabled?
 */
function EditorSetup(props) {
  var _currentSettings$edit;

  // @ts-ignore
  var currentSettings = props.currentSettings,
      updateSettings = props.updateSettings,
      setupEditor = props.setupEditor,
      isEditing = props.isEditing,
      topToolbar = props.topToolbar,
      setupCoreEditor = props.setupCoreEditor; // This is the initial setup

  (0, _element.useEffect)(function () {
    // Ensure we always have a __editorAssets value - Gutenberg hardcoded assets
    // @ts-ignore
    if ((0, _typeof2["default"])(window.__editorAssets) === undefined) {
      // @ts-ignore
      window.__editorAssets = {
        styles: '',
        scripts: ''
      };
    } // Setup the Isolated Editor & Gutenberg


    setupEditor(currentSettings); // And Gutenberg

    updateSettings(currentSettings); // Set up the post entities with some dummy data, ensuring that anything that uses post entities can work

    setupCoreEditor({
      id: 0,
      type: 'post'
    }, []);
  }, []); // Run whenever the editor is focussed, or the topToolbar setting or reusable blocks change

  (0, _element.useEffect)(function () {
    if (!isEditing) {
      return;
    } // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities


    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings === null || currentSettings === void 0 ? void 0 : (_currentSettings$edit = currentSettings.editor) === null || _currentSettings$edit === void 0 ? void 0 : _currentSettings$edit.reusableBlocks]);
  return null;
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
  var settings = _ref.settings;

  var _select = select('isolated/editor'),
      isEditing = _select.isEditing,
      isFeatureActive = _select.isFeatureActive;

  var _select2 = select('core/blocks'),
      getBlockTypes = _select2.getBlockTypes;

  var blockTypes = getBlockTypes();
  var hasFixedToolbar = isFeatureActive('fixedToolbar');
  var reusableBlocks = select('core').getEntityRecords('postType', 'wp_block');
  return {
    isEditing: isEditing(),
    topToolbar: hasFixedToolbar,
    currentSettings: (0, _element.useMemo)(function () {
      var _settings$iso, _settings$iso$default, _settings$iso2, _settings$iso2$defaul;

      return _objectSpread(_objectSpread({}, settings), {}, {
        editor: _objectSpread(_objectSpread({}, (0, _editorSettings["default"])(settings.editor, settings.iso, blockTypes, // Use the default preference, if set, otherwise use the feature
        ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : (_settings$iso$default = _settings$iso.defaultPreferences) === null || _settings$iso$default === void 0 ? void 0 : _settings$iso$default.fixedToolbar) !== undefined ? (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 ? void 0 : (_settings$iso2$defaul = _settings$iso2.defaultPreferences) === null || _settings$iso2$defaul === void 0 ? void 0 : _settings$iso2$defaul.fixedToolbar : hasFixedToolbar)), {}, {
          // Reusable blocks
          __experimentalReusableBlocks: [],
          __experimentalFetchReusableBlocks: false // ...( settings.editor?.__experimentalReusableBlocks === false
          // 	? {
          // 			__experimentalReusableBlocks: reusableBlocks,
          // 			__experimentalFetchReusableBlocks: false,
          // 	  }
          // 	: {
          // 			__experimentalReusableBlocks: reusableBlocks,
          // 			__experimentalFetchReusableBlocks: registry.dispatch( 'core/editor' )
          // 				.__experimentalFetchReusableBlocks,
          // 	  } ),

        })
      });
    }, [settings, blockTypes, hasFixedToolbar, reusableBlocks])
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      updateEditorSettings = _dispatch.updateEditorSettings,
      setupCoreEditor = _dispatch.setupEditorState;

  var _dispatch2 = dispatch('core/block-editor'),
      _updateSettings = _dispatch2.updateSettings;

  var _dispatch3 = dispatch('isolated/editor'),
      setupEditor = _dispatch3.setupEditor;

  return {
    setupEditor: setupEditor,
    setupCoreEditor: setupCoreEditor,
    updateSettings: function updateSettings(_ref2) {
      var editor = _ref2.editor;

      _updateSettings(editor);

      updateEditorSettings(editor);
    }
  };
})])(EditorSetup);

exports["default"] = _default;
//# sourceMappingURL=index.js.map