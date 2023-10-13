"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _icons = require("@wordpress/icons");
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
var _listviewSidebar = _interopRequireDefault(require("../../block-editor/listview-sidebar"));
require("./style.scss");
var _excluded = ["isDisabled"];
/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { createElement } from "react";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function BlockNavigationDropdown(_ref, ref) {
  var isDisabled = _ref.isDisabled,
    props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  // @ts-ignore
  var hasBlocks = (0, _data.useSelect)(function (select) {
    return !!select(_blockEditor.store).getBlockCount();
  }, []);
  var isEnabled = hasBlocks && !isDisabled;
  return createElement(_components.Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    position: "bottom right",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
        onToggle = _ref2.onToggle;
      return createElement(_components.Button, _objectSpread(_objectSpread({}, props), {}, {
        ref: ref,
        icon: _icons.listView,
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        onClick: isEnabled ? onToggle : undefined
        /* translators: button label text should, if possible, be under 16 characters. */,
        label: (0, _i18n.__)('List view'),
        className: "block-editor-block-navigation",
        "aria-disabled": !isEnabled
      }));
    },
    renderContent: function renderContent() {
      return createElement(_listviewSidebar["default"], {
        canClose: false
      });
    }
  });
}
var _default = exports["default"] = (0, _element.forwardRef)(BlockNavigationDropdown);
//# sourceMappingURL=index.js.map