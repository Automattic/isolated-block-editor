"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _interface = require("@wordpress/interface");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _sidebarHeading = _interopRequireDefault(require("./sidebar-heading"));

var _document = _interopRequireDefault(require("../document"));

var _excluded = ["className"];
import { createElement } from "@wordpress/element";

function PluginSidebarEditPost(_ref) {
  var className = _ref.className,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      postTitle: '',
      shortcut: select(_keyboardShortcuts.store).getShortcutRepresentation('core/edit-post/toggle-sidebar'),
      showIconLabels: select('isolated/editor').isFeatureActive('showIconLabels')
    };
  }),
      postTitle = _useSelect.postTitle,
      shortcut = _useSelect.shortcut,
      showIconLabels = _useSelect.showIconLabels;

  return createElement(_interface.ComplementaryArea, (0, _extends2["default"])({
    panelClassName: className,
    className: "edit-post-sidebar",
    smallScreenTitle: postTitle || (0, _i18n.__)('(no title)'),
    scope: "isolated/editor",
    toggleShortcut: shortcut,
    showIconLabels: showIconLabels
  }, props));
}

var SettingsSidebar = function SettingsSidebar(_ref2) {
  var documentInspector = _ref2.documentInspector;

  var _useSelect2 = (0, _data.useSelect)(function (select) {
    var sidebar = select(_interface.store).getActiveComplementaryArea('isolated/editor');

    if (!['edit-post/document', 'edit-post/block'].includes(sidebar)) {
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
      sidebarName = _useSelect2.sidebarName,
      keyboardShortcut = _useSelect2.keyboardShortcut;

  return createElement(PluginSidebarEditPost, {
    className: "iso-sidebar",
    identifier: sidebarName,
    header: createElement(_sidebarHeading["default"], {
      sidebarName: sidebarName,
      documentInspector: documentInspector
    }),
    closeLabel: (0, _i18n.__)('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs"
    /* translators: button label text should, if possible, be under 16 characters. */
    ,
    title: (0, _i18n.__)('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: _icons.cog,
    isActiveByDefault: false
  }, sidebarName === 'edit-post/document' && createElement(_document["default"].Slot, null), sidebarName === 'edit-post/block' && createElement(_blockEditor.BlockInspector, null));
};

var _default = SettingsSidebar;
exports["default"] = _default;
//# sourceMappingURL=sidebar.js.map