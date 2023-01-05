"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useEditorSetup;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _blocks = require("@wordpress/blocks");
var _editorSettings = _interopRequireDefault(require("./editor-settings"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Settings callback
 *
 * @callback OnSettings
 * @param {BlockEditorSettings} settings
 */

/**
 * Sets up Gutenberg and the Isolated Block Editor
 *
 * An initial setup is performed, and is then reset each time the editor is focussed. This ensures we are applying the right
 * settings for this particular editor.
 *
 * @param {BlockEditorSettings} settings - Settings
 */
function useEditorSetup(settings) {
  var _currentSettings$edit;
  // @ts-ignore
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    undo = _useDispatch.undo,
    setupEditor = _useDispatch.setupEditor;
  var _useDispatch2 = (0, _data.useDispatch)('core/editor'),
    updateEditorSettings = _useDispatch2.updateEditorSettings,
    setupCoreEditor = _useDispatch2.setupEditorState;
  var _useDispatch3 = (0, _data.useDispatch)('core/block-editor'),
    updateSettings = _useDispatch3.updateSettings;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _settings$iso, _settings$iso$default, _settings$iso2, _settings$iso2$defaul;
      var _select = select('isolated/editor'),
        isEditingSelect = _select.isEditing,
        isFeatureActive = _select.isFeatureActive;
      // @ts-ignore
      var _select2 = select(_blocks.store),
        getBlockTypes = _select2.getBlockTypes;
      var blockTypes = getBlockTypes();
      // @ts-ignore
      var hasFixedToolbar = isFeatureActive('fixedToolbar');
      return {
        // @ts-ignore
        isEditing: isEditingSelect(),
        topToolbar: hasFixedToolbar,
        currentSettings: _objectSpread(_objectSpread({}, settings), {}, {
          editor: _objectSpread(_objectSpread({}, (0, _editorSettings["default"])(
          // @ts-ignore
          settings.editor, settings.iso, blockTypes,
          // Use the default preference, if set, otherwise use the feature
          ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : (_settings$iso$default = _settings$iso.defaultPreferences) === null || _settings$iso$default === void 0 ? void 0 : _settings$iso$default.fixedToolbar) !== undefined ? (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 ? void 0 : (_settings$iso2$defaul = _settings$iso2.defaultPreferences) === null || _settings$iso2$defaul === void 0 ? void 0 : _settings$iso2$defaul.fixedToolbar : hasFixedToolbar)), {}, {
            // Reusable blocks
            __experimentalReusableBlocks: [],
            __experimentalFetchReusableBlocks: false,
            // Experimental undo, to do some experimental things
            __experimentalUndo: undo
          })
        })
      };
    }, [settings]),
    isEditing = _useSelect.isEditing,
    topToolbar = _useSelect.topToolbar,
    currentSettings = _useSelect.currentSettings;
  function updateAllSettings(newSettings) {
    updateSettings(newSettings.editor);
    updateEditorSettings(newSettings.editor);
  }

  // This is the initial setup
  (0, _element.useEffect)(function () {
    // Ensure we always have a __editorAssets value - Gutenberg hardcoded assets
    // @ts-ignore
    if (window.__editorAssets === undefined) {
      // @ts-ignore
      window.__editorAssets = {
        styles: '',
        scripts: ''
      };
    }

    // Setup the Isolated Editor & Gutenberg
    setupEditor(currentSettings);

    // And Gutenberg
    updateAllSettings(currentSettings);

    // Set up the post entities with some dummy data, ensuring that anything that uses post entities can work
    setupCoreEditor({
      id: 0,
      type: 'post'
    }, []);
  }, []);

  // Run whenever the editor is focussed, or the topToolbar setting or reusable blocks change
  (0, _element.useEffect)(function () {
    if (!isEditing) {
      return;
    }

    // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities
    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings === null || currentSettings === void 0 ? void 0 : (_currentSettings$edit = currentSettings.editor) === null || _currentSettings$edit === void 0 ? void 0 : _currentSettings$edit.reusableBlocks]);
  return settings;
}
//# sourceMappingURL=index.js.map