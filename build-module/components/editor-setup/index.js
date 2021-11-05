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
  var _currentSettings$edit;

  // @ts-ignore
  const {
    currentSettings,
    updateSettings,
    setupEditor,
    isEditing,
    topToolbar,
    setupCoreEditor
  } = props; // This is the initial setup

  useEffect(() => {
    // Setup the Isolated Editor & Gutenberg
    setupEditor(currentSettings); // And Gutenberg

    updateSettings(currentSettings); // Set up the post entities with some dummy data, ensuring that anything that uses post entities can work

    setupCoreEditor({
      id: 0,
      type: 'post'
    }, []);
  }, []); // Run whenever the editor is focussed, or the topToolbar setting or reusable blocks change

  useEffect(() => {
    if (!isEditing) {
      return;
    } // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities


    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings === null || currentSettings === void 0 ? void 0 : (_currentSettings$edit = currentSettings.editor) === null || _currentSettings$edit === void 0 ? void 0 : _currentSettings$edit.reusableBlocks]);
  return null;
}

export default compose([withSelect((select, _ref) => {
  let {
    settings
  } = _ref;
  const {
    isEditing,
    isFeatureActive
  } = select('isolated/editor');
  const {
    getBlockTypes
  } = select('core/blocks');
  const blockTypes = getBlockTypes();
  const hasFixedToolbar = isFeatureActive('fixedToolbar');
  const reusableBlocks = select('core').getEntityRecords('postType', 'wp_block');
  return {
    isEditing: isEditing(),
    topToolbar: hasFixedToolbar,
    currentSettings: useMemo(() => {
      var _settings$iso, _settings$iso$default, _settings$iso2, _settings$iso2$defaul;

      return { ...settings,
        editor: { ...getEditorSettings(settings.editor, settings.iso, blockTypes, // Use the default preference, if set, otherwise use the feature
          ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : (_settings$iso$default = _settings$iso.defaultPreferences) === null || _settings$iso$default === void 0 ? void 0 : _settings$iso$default.fixedToolbar) !== undefined ? (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 ? void 0 : (_settings$iso2$defaul = _settings$iso2.defaultPreferences) === null || _settings$iso2$defaul === void 0 ? void 0 : _settings$iso2$defaul.fixedToolbar : hasFixedToolbar),
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

        }
      };
    }, [settings, blockTypes, hasFixedToolbar, reusableBlocks])
  };
}), withDispatch(dispatch => {
  const {
    updateEditorSettings,
    setupEditorState: setupCoreEditor
  } = dispatch('core/editor');
  const {
    updateSettings
  } = dispatch('core/block-editor');
  const {
    setupEditor
  } = dispatch('isolated/editor');
  return {
    setupEditor,
    setupCoreEditor,
    updateSettings: _ref2 => {
      let {
        editor
      } = _ref2;
      updateSettings(editor);
      updateEditorSettings(editor);
    }
  };
})])(EditorSetup);
//# sourceMappingURL=index.js.map