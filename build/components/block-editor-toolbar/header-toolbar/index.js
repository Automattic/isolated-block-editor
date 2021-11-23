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

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _redo = _interopRequireDefault(require("./redo"));

var _undo = _interopRequireDefault(require("./undo"));

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var preventDefault = function preventDefault(event) {
  event.preventDefault();
};

function HeaderToolbar(props) {
  var _props$settings, _props$settings$iso, _props$settings$iso$s;

  var inserterButton = (0, _element.useRef)();

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setIsInserterOpened = _useDispatch.setIsInserterOpened,
      setIsListViewOpened = _useDispatch.setIsListViewOpened;

  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        hasInserterItems = _select.hasInserterItems,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockSelectionEnd = _select.getBlockSelectionEnd;

    var _select2 = select('isolated/editor'),
        isListViewOpened = _select2.isListViewOpened;

    var _select3 = select(_keyboardShortcuts.store),
        getShortcutRepresentation = _select3.getShortcutRepresentation;

    return {
      hasFixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
      hasPeers: select('isolated/editor').hasPeers(),
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
  }, []),
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      hasPeers = _useSelect.hasPeers,
      isInserterEnabled = _useSelect.isInserterEnabled,
      isTextModeEnabled = _useSelect.isTextModeEnabled,
      showIconLabels = _useSelect.showIconLabels,
      previewDeviceType = _useSelect.previewDeviceType,
      isInserterOpened = _useSelect.isInserterOpened,
      isListViewOpen = _useSelect.isListViewOpen,
      listViewShortcut = _useSelect.listViewShortcut;

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var isWideViewport = (0, _compose.useViewportMatch)('wide');
  var _props$settings$iso$t = props.settings.iso.toolbar,
      inserter = _props$settings$iso$t.inserter,
      toc = _props$settings$iso$t.toc,
      navigation = _props$settings$iso$t.navigation,
      undoSetting = _props$settings$iso$t.undo,
      selectorTool = _props$settings$iso$t.selectorTool;
  var inserterInSidebar = ((_props$settings = props.settings) === null || _props$settings === void 0 ? void 0 : (_props$settings$iso = _props$settings.iso) === null || _props$settings$iso === void 0 ? void 0 : (_props$settings$iso$s = _props$settings$iso.sidebar) === null || _props$settings$iso$s === void 0 ? void 0 : _props$settings$iso$s.inserter) || false;
  var undo = undoSetting && !hasPeers;
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  (0, _i18n.__)('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  (0, _i18n.__)('Document tools');
  var openInserter = (0, _element.useCallback)(function () {
    if (isInserterOpened) {
      // Focusing the inserter button closes the inserter popover
      // @ts-ignore
      inserterButton.current.focus();
    } else {
      setIsInserterOpened(true);
    }
  }, [isInserterOpened, setIsInserterOpened]);
  var toggleListView = (0, _element.useCallback)(function () {
    return setIsListViewOpened(!isListViewOpen);
  }, [setIsListViewOpened, isListViewOpen]);
  return createElement(_blockEditor.NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (inserter || undo || navigation || toc || selectorTool) && createElement("div", {
    className: "edit-post-header-toolbar__left"
  }, inserter && createElement(_components.ToolbarItem, {
    ref: inserterButton,
    as: _components.Button,
    className: "edit-post-header-toolbar__inserter-toggle",
    isPressed: isInserterOpened,
    onMouseDown: preventDefault,
    onClick: openInserter,
    disabled: !isInserterEnabled,
    isPrimary: true,
    icon: _icons.plus
    /* translators: button label text should, if possible, be under 16
    characters. */
    ,
    label: (0, _i18n._x)('Toggle block inserter', 'Generic label for block inserter button'),
    showTooltip: !showIconLabels
  }), isInserterOpened && !inserterInSidebar && createElement(_components.Popover, {
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
  })), selectorTool && createElement(_blockEditor.ToolSelector, null), undo && createElement(_components.ToolbarItem, {
    as: _undo["default"],
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  }), undo && createElement(_components.ToolbarItem, {
    as: _redo["default"],
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  }), navigation && !inserterInSidebar && createElement(_components.ToolbarItem, {
    as: _blockEditor.BlockNavigationDropdown,
    isDisabled: isTextModeEnabled
  }), navigation && inserterInSidebar && createElement(_components.ToolbarItem, {
    as: _components.Button,
    className: "edit-post-header-toolbar__list-view-toggle",
    icon: _icons.listView,
    disabled: isTextModeEnabled,
    isPressed: isListViewOpen
    /* translators: button label text should, if possible, be under 16 characters. */
    ,
    label: (0, _i18n.__)('List View'),
    onClick: toggleListView,
    shortcut: listViewShortcut,
    showTooltip: !showIconLabels
  }), toc && createElement(_components.ToolbarItem, {
    as: _editor.TableOfContents,
    hasOutlineItemsDisabled: isTextModeEnabled,
    repositionDropdown: showIconLabels && !isWideViewport,
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  })));
}

var _default = HeaderToolbar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map