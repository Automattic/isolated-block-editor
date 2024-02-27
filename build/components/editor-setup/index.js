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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * Internal dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
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
    setupCoreEditor = _useDispatch2.setEditedPost;
  var _useDispatch3 = (0, _data.useDispatch)('core/block-editor'),
    updateSettings = _useDispatch3.updateSettings;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _settings$iso, _settings$iso2;
      var _select = select('isolated/editor'),
        isEditingSelect = _select.isEditing,
        isFeatureActive = _select.isFeatureActive;
      // @ts-ignore
      var _select2 = select(_blocks.store),
        getBlockTypes = _select2.getBlockTypes;
      var blockTypes = getBlockTypes();
      // @ts-ignore
      var hasFixedToolbar = isFeatureActive('fixedToolbar', settings === null || settings === void 0 ? void 0 : settings.editor.hasFixedToolbar);
      return {
        // @ts-ignore
        isEditing: isEditingSelect(),
        topToolbar: hasFixedToolbar,
        currentSettings: _objectSpread(_objectSpread({}, settings), {}, {
          editor: _objectSpread(_objectSpread({}, (0, _editorSettings["default"])(
          // @ts-ignore
          settings.editor, settings.iso, blockTypes,
          // Use the default preference, if set, otherwise use the feature
          ((_settings$iso = settings.iso) === null || _settings$iso === void 0 || (_settings$iso = _settings$iso.defaultPreferences) === null || _settings$iso === void 0 ? void 0 : _settings$iso.fixedToolbar) !== undefined ? (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 || (_settings$iso2 = _settings$iso2.defaultPreferences) === null || _settings$iso2 === void 0 ? void 0 : _settings$iso2.fixedToolbar : hasFixedToolbar)), {}, {
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
    setupCoreEditor('post', 0);
  }, []);

  // Run whenever the editor is focussed, or the topToolbar setting or reusable blocks change
  (0, _element.useEffect)(function () {
    if (!isEditing) {
      return;
    }

    // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities
    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings === null || currentSettings === void 0 || (_currentSettings$edit = currentSettings.editor) === null || _currentSettings$edit === void 0 ? void 0 : _currentSettings$edit.reusableBlocks]);
  return settings;
}
//# sourceMappingURL=index.js.map