"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Link menu
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 */
function LinkMenu(_ref) {
  var settings = _ref.settings;
  var linkMenu = settings.iso.linkMenu;

  if (linkMenu.length === 0) {
    return null;
  }

  return createElement(_components.MenuGroup, {
    label: (0, _i18n.__)('Links')
  }, linkMenu.map(function (_ref2) {
    var title = _ref2.title,
        url = _ref2.url;
    return createElement(_components.MenuItem, {
      key: title
    }, createElement(_components.ExternalLink, {
      href: url
    }, title));
  }));
}

var _default = LinkMenu;
exports["default"] = _default;
//# sourceMappingURL=link-menu.js.map