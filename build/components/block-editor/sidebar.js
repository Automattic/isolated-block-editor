"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _icons = require("@wordpress/icons");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _interface = require("@wordpress/interface");
var _element = require("@wordpress/element");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _sidebarHeading = _interopRequireWildcard(require("./sidebar-heading"));
var _document = _interopRequireDefault(require("../document"));
var _complementaryArea = _interopRequireDefault(require("../complementary-area"));
var _unlock2 = require("./unlock");
import { createElement } from "react";
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// @ts-nocheck
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

var _unlock = (0, _unlock2.unlock)(_components.privateApis),
  Tabs = _unlock.Tabs;
function isActiveArea(area) {
  return [_sidebarHeading.sidebars.document, _sidebarHeading.sidebars.block].includes(area);
}
var SettingsSidebarInternal = function SettingsSidebarInternal(_ref) {
  var documentInspector = _ref.documentInspector,
    keyboardShortcut = _ref.keyboardShortcut,
    sidebarName = _ref.sidebarName;
  // Because of the `ComplementaryArea`, we
  // need to forward the `Tabs` context so it can be passed through the
  // underlying slot/fill.
  var tabsContextValue = (0, _element.useContext)(Tabs.Context);
  return createElement(_complementaryArea["default"], {
    className: "iso-sidebar",
    identifier: sidebarName,
    header: createElement(Tabs.Context.Provider, {
      value: tabsContextValue
    }, createElement(_sidebarHeading["default"], {
      documentInspector: documentInspector
    })),
    closeLabel: (0, _i18n.__)('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs"
    /* translators: button label text should, if possible, be under 16 characters. */,
    title: (0, _i18n.__)('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: _icons.cog,
    isActiveByDefault: false
  }, createElement(Tabs.Context.Provider, {
    value: tabsContextValue
  }, createElement(Tabs.TabPanel, {
    tabId: _sidebarHeading.sidebars.document,
    focusable: false
  }, createElement(_document["default"].Slot, null)), createElement(Tabs.TabPanel, {
    tabId: _sidebarHeading.sidebars.block,
    focusable: false
  }, createElement(_blockEditor.BlockInspector, null))));
};
var SettingsSidebar = function SettingsSidebar(_ref2) {
  var documentInspector = _ref2.documentInspector;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var sidebar = select(_interface.store).getActiveComplementaryArea('isolated/editor');
      var isSettingsSidebar = true;
      if (!isActiveArea(sidebar)) {
        isSettingsSidebar = false;
        if (select(_blockEditor.store).getBlockSelectionStart()) {
          sidebar = _sidebarHeading.sidebars.block;
        }
        sidebar = _sidebarHeading.sidebars.document;
      }
      var shortcut = select(_keyboardShortcuts.store).getShortcutRepresentation('core/edit-post/toggle-sidebar');
      return {
        sidebarName: sidebar,
        keyboardShortcut: shortcut,
        isSettingsSidebarActive: isSettingsSidebar
      };
    }, []),
    sidebarName = _useSelect.sidebarName,
    keyboardShortcut = _useSelect.keyboardShortcut,
    isSettingsSidebarActive = _useSelect.isSettingsSidebarActive;
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    onTabSelect = _useDispatch.openGeneralSidebar;
  return createElement(Tabs
  // Due to how this component is controlled (via a value from the
  // `interfaceStore`), when the sidebar closes the currently selected
  // tab can't be found. This causes the component to continuously reset
  // the selection to `null` in an infinite loop.Proactively setting
  // the selected tab to `null` avoids that.
  , {
    selectedTabId: isSettingsSidebarActive ? sidebarName : null,
    onSelect: onTabSelect
  }, createElement(SettingsSidebarInternal, {
    documentInspector: documentInspector,
    keyboardShortcut: keyboardShortcut,
    sidebarName: sidebarName
  }));
};
var _default = exports["default"] = SettingsSidebar;
//# sourceMappingURL=sidebar.js.map