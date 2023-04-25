"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
var _blocks = require("@wordpress/blocks");
/**
 * WordPress dependencies
 */

/** @typedef {import('../../index').OnSaveBlocks} OnSaveBlocks */
/** @typedef {import('../../index').OnSaveContent} OnSaveContent */
/**
 * Content saver
 *
 * @param {Object} props - Component props
 * @param {OnSaveBlocks} [props.onSaveBlocks] - Save blocks callback
 * @param {OnSaveContent} [props.onSaveContent] - Save content callback
 */
function ContentSaver(props) {
  var onSaveBlocks = props.onSaveBlocks,
    onSaveContent = props.onSaveContent;
  var firstTime = (0, _element.useRef)(true);
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    setReady = _useDispatch.setReady;
  var _useSelect = (0, _data.useSelect)(function (select) {
      return {
        // @ts-ignore
        blocks: select('isolated/editor').getBlocks(),
        // @ts-ignore
        ignoredContent: select('isolated/editor').getIgnoredContent()
      };
    }, []),
    blocks = _useSelect.blocks,
    ignoredContent = _useSelect.ignoredContent;
  function saveBlocks() {
    // Save the content in the format wanted by the user
    onSaveBlocks === null || onSaveBlocks === void 0 ? void 0 : onSaveBlocks(blocks, ignoredContent);
    onSaveContent === null || onSaveContent === void 0 ? void 0 : onSaveContent((0, _blocks.serialize)(blocks));
  }
  (0, _element.useEffect)(function () {
    if (!blocks) {
      setReady(true);
      return;
    }

    // Try and avoid an initial first save if no content
    if (firstTime.current) {
      firstTime.current = false;
      setReady(true);

      // The editor has initial content - save it
      if (blocks && blocks.length > 1) {
        saveBlocks();
      }
    } else {
      saveBlocks();
    }
  }, [blocks]);
  return null;
}
var _default = ContentSaver;
exports["default"] = _default;
//# sourceMappingURL=index.js.map