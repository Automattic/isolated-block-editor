"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
import { createElement } from "react";
/**
 * WordPress dependencies
 */

var _createSlotFill = (0, _components.createSlotFill)('IsolatedFooter'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;
var ActionArea = function ActionArea(_ref) {
  var children = _ref.children;
  return createElement(Fill, null, children);
};
ActionArea.Slot = function () {
  return createElement(Slot, null, function (fills) {
    return fills;
  });
};
var _default = exports["default"] = ActionArea;
//# sourceMappingURL=index.js.map