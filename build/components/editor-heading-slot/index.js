"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _jsxRuntime = require("react/jsx-runtime");
var _createSlotFill = (0, _components.createSlotFill)('IsolatedEditorHeading'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;
var EditorHeading = function EditorHeading(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Fill, {
    children: children
  });
};
EditorHeading.Slot = function (props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Slot, {
    children: function children(fills) {
      return fills;
    }
  });
};
var _default = exports["default"] = EditorHeading;
//# sourceMappingURL=index.js.map