"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _index = _interopRequireDefault(require("../index"));

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/** @typedef {import('isolated-block-editor').BlockEditorSettings} BlockEditorSettings */

/**
 * These are the Gutenberg and IsolatedBlockEditor settings. Everything not set uses the defaults.
 *
 * @type BlockEditorSettings
 */
var settings = {
  iso: {
    moreMenu: false
  }
};
/**
 * Saves content to the textarea
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */

function saveBlocks(content, textarea) {
  textarea.value = content;
}
/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */


function _onLoad(content, parser, rawHandler) {
  // Does the content contain blocks?
  if (content.indexOf('<!--') !== -1) {
    // Parse the blocks
    return parser(content);
  } // Raw HTML - do our best


  return rawHandler({
    HTML: content
  });
}
/**
 * Attach IsolatedBlockEditor to a textarea
 * @param {HTMLTextAreaElement} textarea Textarea node
 */


function attachEditor(textarea) {
  // Check it's a textarea
  if (textarea.type.toLowerCase() !== 'textarea') {
    return;
  } // Create a node after the textarea


  var editor = document.createElement('div');
  editor.classList.add('editor'); // Insert after the textarea, and hide it

  textarea.parentNode.insertBefore(editor, textarea.nextSibling);
  textarea.style.display = 'none'; // Render the editor

  (0, _element.render)(createElement(_index["default"], {
    settings: settings,
    onLoad: function onLoad(parser, rawHandler) {
      return _onLoad(textarea.value, parser, rawHandler);
    },
    onSaveContent: function onSaveContent(content) {
      return saveBlocks(content, textarea);
    },
    onError: function onError() {
      return document.location.reload();
    }
  }), editor);
}
/**
 * Remove IsolatedBlockEditor from a textarea node
 * @param {HTMLTextAreaElement} textarea Textarea node
 */


function detachEditor(textarea) {
  /**
   * @type {HTMLElement}
   */
  var editor = textarea.nextSibling;

  if (editor && editor.classList.contains('editor')) {
    (0, _element.unmountComponentAtNode)(editor);
    textarea.style.display = null;
    editor.parentNode.removeChild(editor);
  }
} // This adds the functions to the WP global, making it easier for the example to work.


window.wp = {
  attachEditor: attachEditor,
  detachEditor: detachEditor
};
//# sourceMappingURL=index.js.map