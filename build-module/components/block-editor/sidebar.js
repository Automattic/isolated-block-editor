import { createElement } from "react";
// @ts-nocheck
/**
 * WordPress dependencies
 */
import { BlockInspector, store as blockEditorStore } from '@wordpress/block-editor';
import { cog } from '@wordpress/icons';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { store as interfaceStore } from '@wordpress/interface';
import { useContext } from '@wordpress/element';
import { privateApis as componentsPrivateApis } from "@wordpress/components";

/**
 * Internal dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { default as SettingsHeader, sidebars } from './sidebar-heading';
import Document from '../document';
import ComplementaryArea from '../complementary-area';
import { unlock } from './unlock';
const {
  Tabs
} = unlock(componentsPrivateApis);
function isActiveArea(area) {
  return [sidebars.document, sidebars.block].includes(area);
}
const SettingsSidebarInternal = ({
  documentInspector,
  keyboardShortcut,
  sidebarName
}) => {
  // Because of the `ComplementaryArea`, we
  // need to forward the `Tabs` context so it can be passed through the
  // underlying slot/fill.
  const tabsContextValue = useContext(Tabs.Context);
  return createElement(ComplementaryArea, {
    className: "iso-sidebar",
    identifier: sidebarName,
    header: createElement(Tabs.Context.Provider, {
      value: tabsContextValue
    }, createElement(SettingsHeader, {
      documentInspector: documentInspector
    })),
    closeLabel: __('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs"
    /* translators: button label text should, if possible, be under 16 characters. */,
    title: __('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: cog,
    isActiveByDefault: false
  }, createElement(Tabs.Context.Provider, {
    value: tabsContextValue
  }, createElement(Tabs.TabPanel, {
    tabId: sidebars.document,
    focusable: false
  }, createElement(Document.Slot, null)), createElement(Tabs.TabPanel, {
    tabId: sidebars.block,
    focusable: false
  }, createElement(BlockInspector, null))));
};
const SettingsSidebar = ({
  documentInspector
}) => {
  const {
    sidebarName,
    keyboardShortcut,
    isSettingsSidebarActive
  } = useSelect(select => {
    let sidebar = select(interfaceStore).getActiveComplementaryArea('isolated/editor');
    let isSettingsSidebar = true;
    if (!isActiveArea(sidebar)) {
      isSettingsSidebar = false;
      if (select(blockEditorStore).getBlockSelectionStart()) {
        sidebar = sidebars.block;
      }
      sidebar = sidebars.document;
    }
    const shortcut = select(keyboardShortcutsStore).getShortcutRepresentation('core/edit-post/toggle-sidebar');
    return {
      sidebarName: sidebar,
      keyboardShortcut: shortcut,
      isSettingsSidebarActive: isSettingsSidebar
    };
  }, []);
  const {
    openGeneralSidebar: onTabSelect
  } = useDispatch('isolated/editor');
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
export default SettingsSidebar;
//# sourceMappingURL=sidebar.js.map