import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import getEditorSettings from './editor-settings';
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
  var currentSettings = props.currentSettings,
      updateSettings = props.updateSettings,
      setupEditor = props.setupEditor,
      isEditing = props.isEditing,
      topToolbar = props.topToolbar; // This is the initial setup

  useEffect(function () {
    // Setup the Isolated Editor & Gutenberg
    setupEditor(currentSettings);
    updateSettings(currentSettings);
  }, []); // Run whenever the editor is focussed, or the topToolbar setting or reusable blocks change

  useEffect(function () {
    if (!isEditing) {
      return;
    } // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities


    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings.editor.reusableBlocks]);
  return null;
}

export default compose([withSelect(function (select, _ref, registry) {
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
    currentSettings: useMemo(function () {
      var _settings$editor;

      return _objectSpread(_objectSpread({}, settings), {}, {
        editor: _objectSpread(_objectSpread({}, getEditorSettings(settings.editor, settings.iso, blockTypes, hasFixedToolbar || ((_settings$editor = settings.editor) === null || _settings$editor === void 0 ? void 0 : _settings$editor.hasFixedToolbar) || false)), {}, {
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
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      updateEditorSettings = _dispatch.updateEditorSettings;

  var _dispatch2 = dispatch('core/block-editor'),
      _updateSettings = _dispatch2.updateSettings;

  var _dispatch3 = dispatch('isolated/editor'),
      setupEditor = _dispatch3.setupEditor;

  return {
    setupEditor: setupEditor,
    updateSettings: function updateSettings(_ref2) {
      var editor = _ref2.editor;

      _updateSettings(editor);

      updateEditorSettings(editor);
    }
  };
})])(EditorSetup);
//# sourceMappingURL=index.js.map