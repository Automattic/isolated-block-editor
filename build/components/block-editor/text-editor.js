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
var _jsxRuntime = require("react/jsx-runtime");
// @ts-nocheck
/**
 * Internal dependencies
 */

/**
 * This is a copy of packages/edit-post/src/components/text-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */function TextEditor(_ref) {
  (0, _objectDestructuringEmpty2["default"])(_ref);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "editor-text-editor",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "editor-text-editor__body",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_editorHeadingSlot["default"].Slot, {
        mode: "text"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_postTextEditor["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_footerSlot["default"].Slot, {
        mode: "text"
      })]
    })
  });
}
var _default = exports["default"] = TextEditor;
//# sourceMappingURL=text-editor.js.map