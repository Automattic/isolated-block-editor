import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";
// @ts-nocheck
/**
 * WordPress dependencies
 */
import { BlockInspector, store as blockEditorStore } from '@wordpress/block-editor';
import { cog } from '@wordpress/icons';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { ComplementaryArea, store as interfaceStore } from '@wordpress/interface';

/**
 * Internal dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import SettingsHeader from './sidebar-heading';
import Document from '../document';
function PluginSidebarEditPost(_ref) {
  let {
    className,
    ...props
  } = _ref;
  const {
    postTitle,
    shortcut,
    showIconLabels
  } = useSelect(select => {
    return {
      postTitle: '',
      shortcut: select(keyboardShortcutsStore).getShortcutRepresentation('core/edit-post/toggle-sidebar'),
      showIconLabels: select('isolated/editor').isFeatureActive('showIconLabels')
    };
  }, []);
  return createElement(ComplementaryArea, _extends({
    panelClassName: className,
    className: "edit-post-sidebar",
    smallScreenTitle: postTitle || __('(no title)'),
    scope: "isolated/editor",
    toggleShortcut: shortcut,
    showIconLabels: showIconLabels
  }, props));
}
const SettingsSidebar = _ref2 => {
  let {
    documentInspector
  } = _ref2;
  const {
    sidebarName,
    keyboardShortcut
  } = useSelect(select => {
    let sidebar = select(interfaceStore).getActiveComplementaryArea('isolated/editor');
    if (!['edit-post/document', 'edit-post/block'].includes(sidebar)) {
      sidebar = 'edit-post/document';
      if (select(blockEditorStore).getBlockSelectionStart()) {
        sidebar = 'edit-post/block';
      }
    }
    const shortcut = select(keyboardShortcutsStore).getShortcutRepresentation('core/edit-post/toggle-sidebar');
    return {
      sidebarName: sidebar,
      keyboardShortcut: shortcut
    };
  }, []);
  return createElement(PluginSidebarEditPost, {
    className: "iso-sidebar",
    identifier: sidebarName,
    header: createElement(SettingsHeader, {
      sidebarName: sidebarName,
      documentInspector: documentInspector
    }),
    closeLabel: __('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs"
    /* translators: button label text should, if possible, be under 16 characters. */,
    title: __('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: cog,
    isActiveByDefault: false
  }, sidebarName === 'edit-post/document' && createElement(Document.Slot, null), sidebarName === 'edit-post/block' && createElement(BlockInspector, null));
};
export default SettingsSidebar;
//# sourceMappingURL=sidebar.js.map