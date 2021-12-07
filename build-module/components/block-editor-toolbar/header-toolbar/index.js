import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { ToolbarItem, Button, Popover } from '@wordpress/components';
import { NavigableToolbar, BlockNavigationDropdown, __experimentalLibrary as Library, ToolSelector } from '@wordpress/block-editor';
import { TableOfContents } from '@wordpress/editor';
import { plus, listView } from '@wordpress/icons';
import { useRef, useCallback } from '@wordpress/element';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
/**
 * Internal dependencies
 */

import EditorHistoryRedo from './redo';
import EditorHistoryUndo from './undo';

const preventDefault = event => {
  event.preventDefault();
};

function HeaderToolbar(props) {
  var _props$settings, _props$settings$iso, _props$settings$iso$s;

  const inserterButton = useRef();
  const {
    setIsInserterOpened,
    setIsListViewOpened
  } = useDispatch('isolated/editor');
  const isMobileViewport = useViewportMatch('medium', '<');
  const {
    hasFixedToolbar,
    isInserterEnabled,
    isTextModeEnabled,
    showIconLabels,
    previewDeviceType,
    isInserterOpened,
    isListViewOpen,
    listViewShortcut
  } = useSelect(select => {
    const {
      hasInserterItems,
      getBlockRootClientId,
      getBlockSelectionEnd
    } = select('core/block-editor');
    const {
      isListViewOpened
    } = select('isolated/editor');
    const {
      getShortcutRepresentation
    } = select(keyboardShortcutsStore);
    return {
      hasFixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
      // This setting (richEditingEnabled) should not live in the block editor's setting.
      isInserterEnabled: select('isolated/editor').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled && hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
      isListViewOpen: isListViewOpened(),
      isTextModeEnabled: select('isolated/editor').getEditorMode() === 'text',
      previewDeviceType: 'Desktop',
      isInserterOpened: select('isolated/editor').isInserterOpened(),
      showIconLabels: false,
      // Not implemented yet
      listViewShortcut: getShortcutRepresentation('core/edit-post/toggle-list-view')
    };
  }, []);
  const isLargeViewport = useViewportMatch('medium');
  const isWideViewport = useViewportMatch('wide');
  const {
    inserter,
    toc,
    navigation,
    undo,
    selectorTool
  } = props.settings.iso.toolbar;
  const inserterInSidebar = ((_props$settings = props.settings) === null || _props$settings === void 0 ? void 0 : (_props$settings$iso = _props$settings.iso) === null || _props$settings$iso === void 0 ? void 0 : (_props$settings$iso$s = _props$settings$iso.sidebar) === null || _props$settings$iso$s === void 0 ? void 0 : _props$settings$iso$s.inserter) || false;
  const displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  const toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  __('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  __('Document tools');
  const openInserter = useCallback(() => {
    if (isInserterOpened) {
      // Focusing the inserter button closes the inserter popover
      // @ts-ignore
      setIsInserterOpened(false);
    } else {
      setIsInserterOpened(true);
    }
  }, [isInserterOpened, setIsInserterOpened]);
  const toggleListView = useCallback(() => setIsListViewOpened(!isListViewOpen), [setIsListViewOpened, isListViewOpen]);
  return createElement(NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (inserter || undo || navigation || toc || selectorTool) && createElement("div", {
    className: "edit-post-header-toolbar__left"
  }, inserter && createElement(ToolbarItem, {
    ref: inserterButton,
    as: Button,
    className: "edit-post-header-toolbar__inserter-toggle",
    isPressed: isInserterOpened,
    onMouseDown: preventDefault,
    onClick: openInserter,
    disabled: !isInserterEnabled,
    isPrimary: true,
    icon: plus
    /* translators: button label text should, if possible, be under 16
    characters. */
    ,
    label: _x('Toggle block inserter', 'Generic label for block inserter button'),
    showTooltip: !showIconLabels
  }), isInserterOpened && !inserterInSidebar && createElement(Popover, {
    position: "bottom right",
    onClose: () => setIsInserterOpened(false),
    anchorRef: inserterButton.current
  }, createElement(Library, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    onSelect: () => {
      if (isMobileViewport) {
        setIsInserterOpened(false);
      }
    }
  })), selectorTool && createElement(ToolSelector, null), undo && createElement(ToolbarItem, {
    as: EditorHistoryUndo,
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  }), undo && createElement(ToolbarItem, {
    as: EditorHistoryRedo,
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  }), navigation && !inserterInSidebar && createElement(ToolbarItem, {
    as: BlockNavigationDropdown,
    isDisabled: isTextModeEnabled
  }), navigation && inserterInSidebar && createElement(ToolbarItem, {
    as: Button,
    className: "edit-post-header-toolbar__list-view-toggle",
    icon: listView,
    disabled: isTextModeEnabled,
    isPressed: isListViewOpen
    /* translators: button label text should, if possible, be under 16 characters. */
    ,
    label: __('List View'),
    onClick: toggleListView,
    shortcut: listViewShortcut,
    showTooltip: !showIconLabels
  }), toc && createElement(ToolbarItem, {
    as: TableOfContents,
    hasOutlineItemsDisabled: isTextModeEnabled,
    repositionDropdown: showIconLabels && !isWideViewport,
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  })));
}

export default HeaderToolbar;
//# sourceMappingURL=index.js.map