"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

var _createSlotFill = (0, _components.createSlotFill)('PluginDocumentSettingPanel'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;
var DocumentSection = function DocumentSection(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Fill, {
    children: children
  });
};
DocumentSection.Slot = function (props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Slot, {
    children: function children(fills) {
      return fills ? fills : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "block-editor-block-inspector__no-blocks",
        children: (0, _i18n.__)('Nothing to display')
      });
    }
  });
};
var _default = exports["default"] = DocumentSection;
//# sourceMappingURL=index.js.map