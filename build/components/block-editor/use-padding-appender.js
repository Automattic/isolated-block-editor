"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaddingAppender = usePaddingAppender;
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _blockEditor = require("@wordpress/block-editor");
var _blocks = require("@wordpress/blocks");
// @ts-nocheck
/**
 * WordPress dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/layout/use-padding-appender.js
 *
 * The original is not exported.
 */

// Ruleset to add space for the typewriter effect. When typing in the last
// block, there needs to be room to scroll up.
var CSS = ':root :where(.editor-styles-wrapper)::after {content: ""; display: block; height: 40vh;}';
function usePaddingAppender(enabled) {
  var registry = (0, _data.useRegistry)();
  var effect = (0, _compose.useRefEffect)(function (node) {
    function onMouseDown(event) {
      if (event.target !== node &&
      // Tests for the parent element because in the iframed editor if the click is
      // below the padding the target will be the parent element (html) and should
      // still be treated as intent to append.
      event.target !== node.parentElement) {
        return;
      }

      // Only handle clicks under the last child.
      var lastChild = node.lastElementChild;
      if (!lastChild) {
        return;
      }
      var lastChildRect = lastChild.getBoundingClientRect();
      if (event.clientY < lastChildRect.bottom) {
        return;
      }
      event.preventDefault();
      var blockOrder = registry.select(_blockEditor.store).getBlockOrder('');
      var lastBlockClientId = blockOrder[blockOrder.length - 1];
      var lastBlock = registry.select(_blockEditor.store).getBlock(lastBlockClientId);
      var _registry$dispatch = registry.dispatch(_blockEditor.store),
        selectBlock = _registry$dispatch.selectBlock,
        insertDefaultBlock = _registry$dispatch.insertDefaultBlock;
      if (lastBlock && (0, _blocks.isUnmodifiedDefaultBlock)(lastBlock)) {
        selectBlock(lastBlockClientId);
      } else {
        insertDefaultBlock();
      }
    }
    var ownerDocument = node.ownerDocument;
    // Adds the listener on the document so that in the iframed editor clicks below the
    // padding can be handled as they too should be treated as intent to append.
    ownerDocument.addEventListener('mousedown', onMouseDown);
    return function () {
      ownerDocument.removeEventListener('mousedown', onMouseDown);
    };
  }, [registry]);
  return enabled ? [effect, CSS] : [];
}
//# sourceMappingURL=use-padding-appender.js.map