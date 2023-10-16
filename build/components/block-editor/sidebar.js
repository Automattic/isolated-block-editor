"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _icons = require("@wordpress/icons");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _interface = require("@wordpress/interface");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _sidebarHeading = _interopRequireDefault(require("./sidebar-heading"));
var _document = _interopRequireDefault(require("../document"));
var _complementaryArea = _interopRequireDefault(require("../complementary-area"));
import { createElement } from "react";
// @ts-nocheck
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

function isActiveArea(area) {
  return ['edit-post/document', 'edit-post/block'].includes(area);
}
var SettingsSidebar = function SettingsSidebar(_ref) {
  var documentInspector = _ref.documentInspector;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var sidebar = select(_interface.store).getActiveComplementaryArea('isolated/editor');
      if (!isActiveArea(sidebar)) {
        sidebar = 'edit-post/document';
        if (select(_blockEditor.store).getBlockSelectionStart()) {
          sidebar = 'edit-post/block';
        }
      }
      var shortcut = select(_keyboardShortcuts.store).getShortcutRepresentation('core/edit-post/toggle-sidebar');
      return {
        sidebarName: sidebar,
        keyboardShortcut: shortcut
      };
    }, []),
    sidebarName = _useSelect.sidebarName,
    keyboardShortcut = _useSelect.keyboardShortcut;
  return createElement(_complementaryArea["default"], {
    className: "iso-sidebar",
    identifier: sidebarName,
    header: createElement(_sidebarHeading["default"], {
      sidebarName: sidebarName,
      documentInspector: documentInspector
    }),
    closeLabel: (0, _i18n.__)('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs"
    /* translators: button label text should, if possible, be under 16 characters. */,
    title: (0, _i18n.__)('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: _icons.cog,
    isActiveByDefault: false
  }, sidebarName === 'edit-post/document' && createElement(_document["default"].Slot, null), sidebarName === 'edit-post/block' && createElement(_blockEditor.BlockInspector, null));
};
var _default = exports["default"] = SettingsSidebar;
//# sourceMappingURL=sidebar.js.map