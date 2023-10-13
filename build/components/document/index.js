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

var _createSlotFill = (0, _components.createSlotFill)('PluginDocumentSettingPanel'),
  Fill = _createSlotFill.Fill,
  Slot = _createSlotFill.Slot;
var DocumentSection = function DocumentSection(_ref) {
  var children = _ref.children;
  return createElement(Fill, null, children);
};
DocumentSection.Slot = function (props) {
  return createElement(Slot, null, function (fills) {
    return fills ? fills : createElement("span", {
      className: "block-editor-block-inspector__no-blocks"
    }, (0, _i18n.__)('Nothing to display'));
  });
};
var _default = exports["default"] = DocumentSection;
//# sourceMappingURL=index.js.map