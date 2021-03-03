import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { ToolbarItem, Button, Popover } from '@wordpress/components';
import { BlockToolbar, NavigableToolbar, BlockNavigationDropdown, __experimentalLibrary as Library } from '@wordpress/block-editor';
import { TableOfContents } from '@wordpress/editor';
import { plus } from '@wordpress/icons';
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import EditorHistoryRedo from './redo';
import EditorHistoryUndo from './undo';
import './style.scss';

function HeaderToolbar(props) {
  var inserterButton = useRef();

  var _useDispatch = useDispatch('isolated/editor'),
      setIsInserterOpened = _useDispatch.setIsInserterOpened;

  var isMobileViewport = useViewportMatch('medium', '<');

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        hasInserterItems = _select.hasInserterItems,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockSelectionEnd = _select.getBlockSelectionEnd;

    return {
      hasFixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
      // This setting (richEditingEnabled) should not live in the block editor's setting.
      isInserterEnabled: select('isolated/editor').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled && hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
      isTextModeEnabled: select('isolated/editor').getEditorMode() === 'text',
      previewDeviceType: 'Desktop',
      isInserterOpened: select('isolated/editor').isInserterOpened()
    };
  }, []),
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      isInserterEnabled = _useSelect.isInserterEnabled,
      isTextModeEnabled = _useSelect.isTextModeEnabled,
      previewDeviceType = _useSelect.previewDeviceType,
      isInserterOpened = _useSelect.isInserterOpened;

  var isLargeViewport = useViewportMatch('medium');
  var _props$settings$iso$t = props.settings.iso.toolbar,
      inserter = _props$settings$iso$t.inserter,
      toc = _props$settings$iso$t.toc,
      navigation = _props$settings$iso$t.navigation,
      undo = _props$settings$iso$t.undo;
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  __('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  __('Document tools');
  return createElement(NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (inserter || undo || navigation || toc) && createElement("div", {
    className: "edit-post-header-toolbar__left"
  }, inserter && createElement(ToolbarItem, {
    ref: inserterButton,
    as: Button,
    className: "edit-post-header-toolbar__inserter-toggle",
    isPrimary: true,
    isPressed: isInserterOpened,
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
    },
    onClick: function onClick() {
      if (isInserterOpened) {
        // Focusing the inserter button closes the inserter popover
        inserterButton.current.focus();
      } else {
        setIsInserterOpened(true);
      }
    },
    disabled: !isInserterEnabled,
    icon: plus,
    label: _x('Add block', 'Generic label for block inserter button')
  }), isInserterOpened && createElement(Popover, {
    position: "bottom right",
    onClose: function onClose() {
      return setIsInserterOpened(false);
    },
    anchorRef: inserterButton.current
  }, createElement(Library, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    onSelect: function onSelect() {
      if (isMobileViewport) {
        setIsInserterOpened(false);
      }
    }
  })), undo && createElement(ToolbarItem, {
    as: EditorHistoryUndo
  }), undo && createElement(ToolbarItem, {
    as: EditorHistoryRedo
  }), navigation && createElement(ToolbarItem, {
    as: BlockNavigationDropdown,
    isDisabled: isTextModeEnabled
  }), toc && createElement(ToolbarItem, {
    as: TableOfContents,
    hasOutlineItemsDisabled: isTextModeEnabled
  })), displayBlockToolbar && !isTextModeEnabled && createElement("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, createElement(BlockToolbar, {
    hideDragHandle: true
  })));
}

export default HeaderToolbar;
//# sourceMappingURL=index.js.map