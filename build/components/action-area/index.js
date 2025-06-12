"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

var _createSlotFill = (0, _components.createSlotFill)('IsolatedFooter'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;
var ActionArea = function ActionArea(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Fill, {
    children: children
  });
};
ActionArea.Slot = function () {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Slot, {
    children: function children(fills) {
      return fills;
    }
  });
};
var _default = exports["default"] = ActionArea;
//# sourceMappingURL=index.js.map