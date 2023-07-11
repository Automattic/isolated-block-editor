import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */

import { useEffect, useRef } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { cog } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import MoreMenu from './more-menu';
import HeaderToolbar from './header-toolbar';
import Inspector from './inspector';
import ToolbarSlot from './slot';
import './style.scss';

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Block editor toolbar
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
const BlockEditorToolbar = props => {
  const ref = useRef(null);
  const {
    settings,
    editorMode,
    renderMoreMenu
  } = props;
  const isHugeViewport = useViewportMatch('huge', '>=');
  const {
    inspector
  } = settings.iso?.toolbar || {};
  const {
    moreMenu
  } = settings.iso || {};
  const inspectorInSidebar = settings?.iso?.sidebar?.inspector || false;
  const {
    openGeneralSidebar,
    closeGeneralSidebar
  } = useDispatch('isolated/editor');
  const {
    setIsInserterOpened
  } = useDispatch('isolated/editor');
  const {
    isEditorSidebarOpened,
    isBlockSelected,
    hasBlockSelected,
    isInserterOpened,
    isEditing
  } = useSelect(select => ({
    isEditing: select('isolated/editor'),
    // @ts-ignore
    isEditorSidebarOpened: select('isolated/editor').isEditorSidebarOpened(),
    // @ts-ignore
    isBlockSelected: !!select('core/block-editor').getBlockSelectionStart(),
    // @ts-ignore
    hasBlockSelected: !!select('core/block-editor').getBlockSelectionStart(),
    // @ts-ignore
    isInserterOpened: select('isolated/editor').isInserterOpened()
  }), []);
  function toggleSidebar(isOpen) {
    if (!isOpen) {
      closeGeneralSidebar();
    } else {
      openGeneralSidebar(hasBlockSelected ? 'edit-post/block' : 'edit-post/document');
    }
  }

  // If in popover mode then ensure the sidebar is closed when the editor is first started. This is because the complimentary area status
  // is saved to localStorage, and it might have been left open when in sidebar mode.
  useEffect(() => {
    if (!inspectorInSidebar) {
      closeGeneralSidebar();
    }
  }, []);
  useEffect(() => {
    // Close the block inspector when no block is selected. Gutenberg gets a bit crashy otherwise
    if (!inspectorInSidebar && !isEditing && !isBlockSelected && isEditorSidebarOpened) {
      closeGeneralSidebar();
    }
  }, [isEditing]);

  // Inserter and Sidebars are mutually exclusive
  useEffect(() => {
    if (isEditorSidebarOpened && !isHugeViewport) {
      setIsInserterOpened(false);
    }
  }, [isEditorSidebarOpened, isHugeViewport]);
  useEffect(() => {
    if (isInserterOpened && (!isHugeViewport || !inspectorInSidebar)) {
      closeGeneralSidebar();
    }
  }, [isInserterOpened, isHugeViewport]);
  return createElement("div", {
    className: "edit-post-editor-regions__header",
    role: "region",
    tabIndex: -1
  }, createElement("div", {
    className: "edit-post-header"
  }, createElement("div", {
    className: "edit-post-header__toolbar"
  }, createElement(HeaderToolbar, {
    settings: settings
  })), createElement("div", {
    className: "edit-post-header__settings",
    ref: ref
  }, createElement(ToolbarSlot.Slot, null), inspector && createElement(Button, {
    icon: cog,
    label: __('Settings'),
    onClick: () => toggleSidebar(!isEditorSidebarOpened),
    isPressed: isEditorSidebarOpened,
    "aria-expanded": isEditorSidebarOpened,
    disabled: editorMode === 'text'
  }), isEditorSidebarOpened && !inspectorInSidebar && createElement(Inspector, {
    button: ref,
    onToggle: toggleSidebar
  }), moreMenu && createElement(MoreMenu, {
    settings: settings,
    onClick: () => closeGeneralSidebar(),
    renderMoreMenu: renderMoreMenu
  }))));
};
export default BlockEditorToolbar;
//# sourceMappingURL=index.js.map