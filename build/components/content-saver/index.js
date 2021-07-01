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
 * @param {object} props - Component props
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
      blocks: select('isolated/editor').getBlocks(),
      ignoredContent: select('isolated/editor').getIgnoredContent()
    };
  }, []),
      blocks = _useSelect.blocks,
      ignoredContent = _useSelect.ignoredContent;

  (0, _element.useEffect)(function () {
    if (!blocks) {
      setReady(true);
      return;
    } // We don't want the onSave to trigger when we first load our content. It's not a major problem, but it adds complexity to the caller if it might trigger a remote save


    if (firstTime.current) {
      firstTime.current = false;
      setReady(true);
    } else {
      // Save the content in the format wanted by the user
      onSaveBlocks && onSaveBlocks(blocks, ignoredContent);
      onSaveContent && onSaveContent((0, _blocks.serialize)(blocks));
    }
  }, [blocks]);
  return null;
}

var _default = ContentSaver;
exports["default"] = _default;
//# sourceMappingURL=index.js.map