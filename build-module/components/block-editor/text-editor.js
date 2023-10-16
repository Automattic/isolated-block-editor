import { createElement } from "react";
// @ts-nocheck
/**
 * Internal dependencies
 */
import PostTextEditor from './post-text-editor';
import EditorHeading from '../editor-heading-slot';
import FooterSlot from '../footer-slot';

/**
 * This is a copy of packages/edit-post/src/components/text-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
function TextEditor({}) {
  return createElement("div", {
    className: "edit-post-text-editor"
  }, createElement("div", {
    className: "edit-post-text-editor__body"
  }, createElement(EditorHeading.Slot, {
    mode: "text"
  }), createElement(PostTextEditor, null), createElement(FooterSlot.Slot, {
    mode: "text"
  })));
}
export default TextEditor;
//# sourceMappingURL=text-editor.js.map