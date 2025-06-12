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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function TextEditor({}) {
  return /*#__PURE__*/_jsx("div", {
    className: "editor-text-editor",
    children: /*#__PURE__*/_jsxs("div", {
      className: "editor-text-editor__body",
      children: [/*#__PURE__*/_jsx(EditorHeading.Slot, {
        mode: "text"
      }), /*#__PURE__*/_jsx(PostTextEditor, {}), /*#__PURE__*/_jsx(FooterSlot.Slot, {
        mode: "text"
      })]
    })
  });
}
export default TextEditor;
//# sourceMappingURL=text-editor.js.map