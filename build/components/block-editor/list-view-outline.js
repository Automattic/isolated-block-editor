"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListViewOutline;
var _editor = require("@wordpress/editor");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

function ListViewOutline() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "editor-list-view-sidebar__outline",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.__experimentalText, {
          children: (0, _i18n.__)('Characters:')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.__experimentalText, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.CharacterCount, {})
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.__experimentalText, {
          children: (0, _i18n.__)('Words:')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.WordCount, {})]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.__experimentalText, {
          children: (0, _i18n.__)('Time to read:')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.TimeToRead, {})]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.DocumentOutline, {})]
  });
}
//# sourceMappingURL=list-view-outline.js.map