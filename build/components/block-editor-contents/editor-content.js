"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blocks = require("@wordpress/blocks");
/**
 * WordPress dependencies
 */

/** @typedef {import('../../store/editor/reducer').Pattern} Pattern */

var getPattern = function getPattern(patterns, currentPattern) {
  return patterns && patterns.find(function (item) {
    return item.name === currentPattern;
  });
};

/**
 * Get the pattern to start an editor with.
 *
 * @param {Pattern[]} patterns Array of patterns
 * @param {string} currentPattern Current pattern name
 * @param {object[]} template Current template
 * @param {object[]} initialContent Initial content
 */
function getInitialEditorContent(patterns, currentPattern, template, initialContent) {
  // No patterns = do nothing
  if (patterns === undefined) {
    return initialContent;
  }

  // Existing content comes before anything
  if (initialContent && initialContent.length > 0) {
    return initialContent;
  }

  // Did we load the page with a template set?
  if (currentPattern) {
    var pattern = getPattern(patterns, currentPattern);
    if (pattern) {
      return (0, _blocks.parse)(pattern.content);
    }
  }
  if (template) {
    return (0, _blocks.synchronizeBlocksWithTemplate)(initialContent, template);
  }

  // No content
  return [];
}
var _default = getInitialEditorContent;
exports["default"] = _default;
//# sourceMappingURL=editor-content.js.map