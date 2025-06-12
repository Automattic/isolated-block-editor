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
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // @ts-nocheck
/**
 * WordPress dependencies
 */ /**
     * Internal dependencies
     */ /** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */ /**
                                                                                            * Close dropdown callback
                                                                                            *
                                                                                            * @callback OnClose
                                                                                            */ /**
                                                                                                * More menu render callback
                                                                                                *
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
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */
var MoreMenu = function MoreMenu(_ref) {
  var settings = _ref.settings,
    onClick = _ref.onClick,
    renderMoreMenu = _ref.renderMoreMenu;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.DropdownMenu, {
    className: "edit-post-more-menu",
    icon: _icons.moreVertical,
    label: (0, _i18n.__)('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: _objectSpread(_objectSpread({}, TOGGLE_PROPS), {}, {
      onClick: onClick
    }),
    children: function children(_ref2) {
      var onClose = _ref2.onClose;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [renderMoreMenu && renderMoreMenu(settings, onClose), /*#__PURE__*/(0, _jsxRuntime.jsx)(_editorMenu["default"], {
          onClose: onClose,
          settings: settings
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_writingMenu["default"], {
          onClose: onClose,
          settings: settings
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_linkMenu["default"], {
          settings: settings
        })]
      });
    }
  });
};
var _default = exports["default"] = MoreMenu;
//# sourceMappingURL=index.js.map