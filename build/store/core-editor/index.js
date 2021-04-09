"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */

/**
 * Override the default `core/editor` store with functions that return data from `core/block-editor` instead of the post in `core/editor`
 */
function _default(existingSelectors, newSelect) {
  return {
    getEditedPostAttribute: function getEditedPostAttribute(state, attributeName) {
      if (attributeName === 'content') {
        // Content is stored in core/block-editor, not in the post entity
        return (0, _blocks.serialize)(newSelect('core/block-editor').getBlocks());
      } // Pass everything else through


      return existingSelectors.getEditedPostAttribute(state, attributeName);
    },
    getEditedPostContent: function getEditedPostContent() {
      return (0, _blocks.serialize)(newSelect('core/block-editor').getBlocks());
    }
  };
}
//# sourceMappingURL=index.js.map