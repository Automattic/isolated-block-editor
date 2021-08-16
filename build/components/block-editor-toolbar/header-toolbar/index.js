"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _icons = require("@wordpress/icons");

var _element = require("@wordpress/element");

var _redo = _interopRequireDefault(require("./redo"));

var _undo = _interopRequireDefault(require("./undo"));

require("./style.scss");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function HeaderToolbar(props) {
  var inserterButton = (0, _element.useRef)();

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setIsInserterOpened = _useDispatch.setIsInserterOpened;

  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        hasInserterItems = _select.hasInserterItems,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockSelectionEnd = _select.getBlockSelectionEnd;

    return {
      hasFixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
      hasPeers: select('isolated/editor').hasPeers(),
      // This setting (richEditingEnabled) should not live in the block editor's setting.
      isInserterEnabled: select('isolated/editor').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled && hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
      isTextModeEnabled: select('isolated/editor').getEditorMode() === 'text',
      previewDeviceType: 'Desktop',
      isInserterOpened: select('isolated/editor').isInserterOpened()
    };
  }, []),
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      hasPeers = _useSelect.hasPeers,
      isInserterEnabled = _useSelect.isInserterEnabled,
      isTextModeEnabled = _useSelect.isTextModeEnabled,
      previewDeviceType = _useSelect.previewDeviceType,
      isInserterOpened = _useSelect.isInserterOpened;

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var _props$settings$iso$t = props.settings.iso.toolbar,
      inserter = _props$settings$iso$t.inserter,
      toc = _props$settings$iso$t.toc,
      navigation = _props$settings$iso$t.navigation,
      undoSetting = _props$settings$iso$t.undo;
  var undo = undoSetting && !hasPeers;
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  (0, _i18n.__)('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  (0, _i18n.__)('Document tools');
  return createElement(_blockEditor.NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (inserter || undo || navigation || toc) && createElement("div", {
    className: "edit-post-header-toolbar__left"
  }, inserter && createElement(_components.ToolbarItem, {
    ref: inserterButton,
    as: _components.Button,
    className: "edit-post-header-toolbar__inserter-toggle",
    isPrimary: true,
    isPressed: isInserterOpened,
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
    },
    onClick: function onClick() {
      if (isInserterOpened) {
        // Focusing the inserter button closes the inserter popover
        // @ts-ignore
        inserterButton.current.focus();
      } else {
        setIsInserterOpened(true);
      }
    },
    disabled: !isInserterEnabled,
    icon: _icons.plus,
    label: (0, _i18n._x)('Add block', 'Generic label for block inserter button')
  }), isInserterOpened && createElement(_components.Popover, {
    position: "bottom right",
    onClose: function onClose() {
      return setIsInserterOpened(false);
    },
    anchorRef: inserterButton.current
  }, createElement(_blockEditor.__experimentalLibrary, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    onSelect: function onSelect() {
      if (isMobileViewport) {
        setIsInserterOpened(false);
      }
    }
  })), undo && createElement(_components.ToolbarItem, {
    as: _undo["default"]
  }), undo && createElement(_components.ToolbarItem, {
    as: _redo["default"]
  }), navigation && createElement(_components.ToolbarItem, {
    as: _blockEditor.BlockNavigationDropdown,
    isDisabled: isTextModeEnabled
  }), toc && createElement(_components.ToolbarItem, {
    as: _editor.TableOfContents,
    hasOutlineItemsDisabled: isTextModeEnabled
  })), displayBlockToolbar && !isTextModeEnabled && createElement("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, createElement(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })));
}

var _default = HeaderToolbar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map