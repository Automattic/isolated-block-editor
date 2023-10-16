"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blocks = require("@wordpress/blocks");
// @ts-nocheck
/**
 * WordPress dependencies
 */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../store/editor/reducer').Pattern} Pattern */

/**
 * Update callback
 *
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 */
/**
 * Sets up Gutenberg and the Isolated Block Editor
 *
 * An initial setup is performed, and is then reset each time the editor is focussed. This ensures we are applying the right
 * settings for this particular editor.
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {Pattern} props.currentPattern - Currently selected pattern
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 */
function PatternMonitor(props) {
  var currentPattern = props.currentPattern,
    updateBlocksWithoutUndo = props.updateBlocksWithoutUndo;
  var previous = (0, _element.useRef)(null);

  // Monitor the current pattern and update the editor content if it changes
  (0, _element.useEffect)(function () {
    if (currentPattern === null || previous.current === currentPattern) {
      // @ts-ignore
      previous.current = currentPattern;
      return;
    }

    // @ts-ignore
    previous.current = currentPattern.name;
    setTimeout(function () {
      updateBlocksWithoutUndo((0, _blocks.parse)(currentPattern.content));
    }, 0);
  }, [currentPattern]);
  return null;
}
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
    getCurrentPattern = _select.getCurrentPattern;
  return {
    currentPattern: getCurrentPattern()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
    updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;
  return {
    updateBlocksWithoutUndo: updateBlocksWithoutUndo
  };
})])(PatternMonitor);
//# sourceMappingURL=index.js.map