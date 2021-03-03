/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { parse } from '@wordpress/blocks';
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('../../store/editor/reducer').Pattern} Pattern */

/**
 * Update callback
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 */

/**
 * Sets up Gutenberg and the Isolated Block Editor
 *
 * An initial setup is performed, and is then reset each time the editor is focussed. This ensures we are applying the right
 * settings for this particular editor.
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {Pattern} props.currentPattern - Currently selected pattern
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 */

function PatternMonitor(props) {
  var currentPattern = props.currentPattern,
      updateBlocksWithoutUndo = props.updateBlocksWithoutUndo; // Monitor the current pattern and update the editor content if it changes

  useEffect(function () {
    if (currentPattern === null) {
      return;
    }

    updateBlocksWithoutUndo(parse(currentPattern.content));
  }, [currentPattern]);
  return null;
}

export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      getCurrentPattern = _select.getCurrentPattern;

  return {
    currentPattern: getCurrentPattern()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;

  return {
    updateBlocksWithoutUndo: updateBlocksWithoutUndo
  };
})])(PatternMonitor);
//# sourceMappingURL=index.js.map