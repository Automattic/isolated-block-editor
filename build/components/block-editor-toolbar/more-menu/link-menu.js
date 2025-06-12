"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Link menu
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 */function LinkMenu(_ref) {
  var settings = _ref.settings;
  var _ref2 = settings.iso || {},
    _ref2$linkMenu = _ref2.linkMenu,
    linkMenu = _ref2$linkMenu === void 0 ? [] : _ref2$linkMenu;
  if (linkMenu.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.MenuGroup, {
    label: (0, _i18n.__)('Links'),
    children: linkMenu.map(function (_ref3) {
      var title = _ref3.title,
        url = _ref3.url;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.MenuItem, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.ExternalLink, {
          href: url,
          children: title
        })
      }, title);
    })
  });
}
var _default = exports["default"] = LinkMenu;
//# sourceMappingURL=link-menu.js.map