import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import React from 'react';
/**
 * Internal dependencies
 */

import PostTextEditor from './post-text-editor';
import EditorHeading from '../editor-heading-slot';
/**
 * This is a copy of packages/edit-post/src/components/text-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */

function TextEditor(_ref) {
  let {} = _ref;
  return createElement("div", {
    className: "edit-post-text-editor"
  }, createElement("div", {
    className: "edit-post-text-editor__body"
  }, createElement(EditorHeading.Slot, {
    mode: "text"
  }), createElement(PostTextEditor, null)));
}

export default TextEditor;
//# sourceMappingURL=text-editor.js.map