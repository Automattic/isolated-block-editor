/**
 * WordPress dependencies
 */

import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blocksStore } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import getEditorSettings from './editor-settings';

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
export default function useEditorSetup(settings) {
  // @ts-ignore
  const {
    undo,
    setupEditor
  } = useDispatch('isolated/editor');
  const {
    updateEditorSettings,
    setupEditorState: setupCoreEditor
  } = useDispatch('core/editor');
  const {
    updateSettings
  } = useDispatch('core/block-editor');
  const {
    isEditing,
    topToolbar,
    currentSettings
  } = useSelect(select => {
    const {
      isEditing: isEditingSelect,
      isFeatureActive
    } = select('isolated/editor');
    // @ts-ignore
    const {
      getBlockTypes
    } = select(blocksStore);
    const blockTypes = getBlockTypes();
    // @ts-ignore
    const hasFixedToolbar = isFeatureActive('fixedToolbar');
    return {
      // @ts-ignore
      isEditing: isEditingSelect(),
      topToolbar: hasFixedToolbar,
      currentSettings: {
        ...settings,
        editor: {
          ...getEditorSettings(
          // @ts-ignore
          settings.editor, settings.iso, blockTypes,
          // Use the default preference, if set, otherwise use the feature
          settings.iso?.defaultPreferences?.fixedToolbar !== undefined ? settings.iso?.defaultPreferences?.fixedToolbar : hasFixedToolbar),
          // Reusable blocks
          __experimentalReusableBlocks: [],
          __experimentalFetchReusableBlocks: false,
          // Experimental undo, to do some experimental things
          __experimentalUndo: undo
        }
      }
    };
  }, [settings]);
  function updateAllSettings(newSettings) {
    updateSettings(newSettings.editor);
    updateEditorSettings(newSettings.editor);
  }

  // This is the initial setup
  useEffect(() => {
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
  useEffect(() => {
    if (!isEditing) {
      return;
    }

    // Setup Gutenberg for this editor, but only when focussed. This swaps allowed blocks and other capabilities
    updateSettings(currentSettings);
  }, [isEditing, topToolbar, currentSettings?.editor?.reusableBlocks]);
  return settings;
}
//# sourceMappingURL=index.js.map