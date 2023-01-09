"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _postTextEditor = _interopRequireDefault(require("./post-text-editor"));
var _editorHeadingSlot = _interopRequireDefault(require("../editor-heading-slot"));
var _footerSlot = _interopRequireDefault(require("../footer-slot"));
import { createElement } from "@wordpress/element";
// @ts-nocheck
/**
 * Internal dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/text-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
function TextEditor(_ref) {
  (0, _objectDestructuringEmpty2["default"])(_ref);
  return createElement("div", {
    className: "edit-post-text-editor"
  }, createElement("div", {
    className: "edit-post-text-editor__body"
  }, createElement(_editorHeadingSlot["default"].Slot, {
    mode: "text"
  }), createElement(_postTextEditor["default"], null), createElement(_footerSlot["default"].Slot, {
    mode: "text"
  })));
}
var _default = TextEditor;
exports["default"] = _default;
//# sourceMappingURL=text-editor.js.map