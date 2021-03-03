"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _writingMenu = _interopRequireDefault(require("./writing-menu"));

var _editorMenu = _interopRequireDefault(require("./editor-menu"));

var _linkMenu = _interopRequireDefault(require("./link-menu"));

import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Close dropdown callback
 * @callback OnClose
 */

/**
 * More menu render callback
 * @callback OnMore
 * @param {BlockEditorSettings} settings - Settings
 * @param {OnClose} onClose - Callback to close the menu
 */
var POPOVER_PROPS = {
  className: 'edit-post-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};
/**
 * More menu
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */

var MoreMenu = function MoreMenu(_ref) {
  var settings = _ref.settings,
      onClick = _ref.onClick,
      renderMoreMenu = _ref.renderMoreMenu;
  return createElement(_components.DropdownMenu, {
    className: "edit-post-more-menu",
    icon: _icons.moreVertical,
    label: (0, _i18n.__)('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: _objectSpread(_objectSpread({}, TOGGLE_PROPS), {}, {
      onClick: onClick
    })
  }, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, renderMoreMenu && renderMoreMenu(settings, onClose), createElement(_editorMenu["default"], {
      onClose: onClose,
      settings: settings
    }), createElement(_writingMenu["default"], {
      onClose: onClose,
      settings: settings
    }), createElement(_linkMenu["default"], {
      settings: settings
    }));
  });
};

var _default = MoreMenu;
exports["default"] = _default;
//# sourceMappingURL=index.js.map