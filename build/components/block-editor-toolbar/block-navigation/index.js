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
import { createElement } from "@wordpress/element";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var _default = (0, _element.forwardRef)(BlockNavigationDropdown);
exports["default"] = _default;
//# sourceMappingURL=index.js.map