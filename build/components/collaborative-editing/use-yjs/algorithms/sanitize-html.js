"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sanitizeHTML;
var _dom = require("@wordpress/dom");
/**
 * WordPress dependencies
 */

// TODO: Unsolved problem
// The limitation in our sanitization strategy is that it does not match the
// server-side wp_kses rules, which should be considered the canonical config
// of how unsafe the site owner is willing to be. On sites that do allow script tags,
// this crude sanitization strategy could wipe out those tags if a peer joined
// and re-saved their sanitized content.
//
// The ideal solution would be for block authors to make sure that any arbitrary code
// is run through wp_kses before executing.

/**
 * Strips scripts and on* attributes from HTML.
 *
 * Slightly modified version of wp.dom.safeHTML() that only alters the
 * HTML if it actually finds nodes/attributes to remove. This is so we can leave
 * invalid HTML intact, for example if a user is still in the middle of typing the HTML string.
 *
 * @param {string} html HTML to sanitize.
 *
 * @return {string} The sanitized HTML.
 */
function sanitizeHTML(html) {
  var _document$implementat = document.implementation.createHTMLDocument(''),
    body = _document$implementat.body;
  body.innerHTML = html;
  var elements = body.getElementsByTagName('*');
  var elementIndex = elements.length;
  var found = 0;
  while (elementIndex--) {
    var element = elements[elementIndex];
    if (element.tagName === 'SCRIPT') {
      found++;
      (0, _dom.remove)(element);
    } else {
      var attributeIndex = element.attributes.length;
      while (attributeIndex--) {
        var key = element.attributes[attributeIndex].name;
        if (key.startsWith('on')) {
          found++;
          element.removeAttribute(key);
        }
      }
    }
  }
  return found ? body.innerHTML : html;
}
//# sourceMappingURL=sanitize-html.js.map