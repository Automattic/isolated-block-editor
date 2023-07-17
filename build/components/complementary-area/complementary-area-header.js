"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classnames = _interopRequireDefault(require("classnames"));
var _components = require("@wordpress/components");
var _data = require("@wordpress/data");
var _interface = require("@wordpress/interface");
var _icons = require("@wordpress/icons");
var _excluded = ["as", "scope", "identifier", "icon", "selectedIcon", "name"];
/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { createElement, Fragment } from "@wordpress/element";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function ComplementaryAreaToggle(_ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? _components.Button : _ref$as,
    scope = _ref.scope,
    identifier = _ref.identifier,
    icon = _ref.icon,
    selectedIcon = _ref.selectedIcon,
    name = _ref.name,
    props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var ComponentToUse = as;
  var isSelected = (0, _data.useSelect)(function (select) {
    return (
      // @ts-ignore
      select(_interface.store).getActiveComplementaryArea(scope) === identifier
    );
  }, [identifier]);
  var _useDispatch = (0, _data.useDispatch)(_interface.store),
    enableComplementaryArea = _useDispatch.enableComplementaryArea,
    disableComplementaryArea = _useDispatch.disableComplementaryArea;
  return createElement(ComponentToUse, _objectSpread({
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: function onClick() {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    }
  }, props));
}
var ComplementaryAreaHeader = function ComplementaryAreaHeader(_ref2) {
  var smallScreenTitle = _ref2.smallScreenTitle,
    children = _ref2.children,
    className = _ref2.className,
    toggleButtonProps = _ref2.toggleButtonProps;
  var toggleButton = createElement(ComplementaryAreaToggle, _objectSpread({
    icon: _icons.closeSmall
  }, toggleButtonProps));
  return createElement(Fragment, null, createElement("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && createElement("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), toggleButton), createElement("div", {
    className: (0, _classnames["default"])('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, toggleButton));
};
var _default = ComplementaryAreaHeader;
exports["default"] = _default;
//# sourceMappingURL=complementary-area-header.js.map