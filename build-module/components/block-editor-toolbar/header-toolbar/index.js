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
  const inserterButton = useRef();
  const {
    setIsInserterOpened
  } = useDispatch('isolated/editor');
  const isMobileViewport = useViewportMatch('medium', '<');
  const {
    hasFixedToolbar,
    hasPeers,
    isInserterEnabled,
    isTextModeEnabled,
    previewDeviceType,
    isInserterOpened
  } = useSelect(select => {
    const {
      hasInserterItems,
      getBlockRootClientId,
      getBlockSelectionEnd
    } = select('core/block-editor');
    return {
      hasFixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
      hasPeers: select('isolated/editor').hasPeers(),
      // This setting (richEditingEnabled) should not live in the block editor's setting.
      isInserterEnabled: select('isolated/editor').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled && hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
      isTextModeEnabled: select('isolated/editor').getEditorMode() === 'text',
      previewDeviceType: 'Desktop',
      isInserterOpened: select('isolated/editor').isInserterOpened()
    };
  }, []);
  const isLargeViewport = useViewportMatch('medium');
  const {
    inserter,
    toc,
    navigation,
    undo: undoSetting
  } = props.settings.iso.toolbar;
  const undo = undoSetting && !hasPeers;
  const displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  const toolbarAriaLabel = displayBlockToolbar ?
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
    onMouseDown: event => {
      event.preventDefault();
    },
    onClick: () => {
      if (isInserterOpened) {
        // Focusing the inserter button closes the inserter popover
        // @ts-ignore
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