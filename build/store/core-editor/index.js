"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Override the default `core/editor` store with functions that return data from `core/block-editor` instead of the post in `core/editor`
 */
var _default = {
  'core/editor': function coreEditor(select, registry) {
    return {
      getEditedPostAttribute: function getEditedPostAttribute(attributeName) {
        if (attributeName === 'content') {
          return (0, _blocks.serialize)((0, _data.useSelect)(function (select) {
            return select('core/block-editor').getBlocks();
          }));
        }

        if (attributeName === 'title') {
          return '';
        }

        if (attributeName === 'type') {
          return 'post';
        }

        return select.getEditedPostAttribute(attributeName);
      },
      getEditedPostContent: function getEditedPostContent() {
        return (0, _blocks.serialize)(registry.select('core/block-editor').getBlocks());
      }
    };
  }
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map