"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
import { createElement } from "react";
/**
 * WordPress dependencies
 */

var _createSlotFill = (0, _components.createSlotFill)('IsolatedToolbar'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;

/**
 * A Toolbar slot/fill
 *
 * @param {Object} props Component props
 * @param {Object} props.children Child components to insert in the toolbar slot
 * @return object
 */
var ToolbarSlot = function ToolbarSlot(_ref) {
  var children = _ref.children;
  return createElement(Fill, null, children);
};
ToolbarSlot.Slot = function (props) {
  return createElement(Slot, null, function (fills) {
    return fills;
  });
};
var _default = exports["default"] = ToolbarSlot;
//# sourceMappingURL=slot.js.map