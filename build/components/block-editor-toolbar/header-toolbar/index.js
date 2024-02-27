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
var _icons = require("@wordpress/icons");
var _element = require("@wordpress/element");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _redo = _interopRequireDefault(require("./redo"));
var _undo = _interopRequireDefault(require("./undo"));
var _blockNavigation = _interopRequireDefault(require("../block-navigation"));
require("./style.scss");
import { createElement } from "react";
// @ts-nocheck
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
  var _props$settings;
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
      // @ts-ignore
      var _select3 = select(_keyboardShortcuts.store),
        getShortcutRepresentation = _select3.getShortcutRepresentation;
      return {
        // @ts-ignore
        fixedToolbar: select('isolated/editor').isFeatureActive('fixedToolbar'),
        // This setting (richEditingEnabled) should not live in the block editor's setting.
        isInserterEnabled:
        // @ts-ignore
        select('isolated/editor').getEditorMode() === 'visual' &&
        // @ts-ignore
        select('core/editor').getEditorSettings().richEditingEnabled &&
        // @ts-ignore
        hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
        // @ts-ignore
        isListViewOpen: isListViewOpened(),
        // @ts-ignore
        isTextModeEnabled: select('isolated/editor').getEditorMode() === 'text',
        previewDeviceType: 'Desktop',
        // @ts-ignore
        isInserterOpened: select('isolated/editor').isInserterOpened(),
        showIconLabels: false,
        // Not implemented yet
        listViewShortcut: getShortcutRepresentation('core/edit-post/toggle-list-view')
      };
    }, []),
    fixedToolbar = _useSelect.fixedToolbar,
    isInserterEnabled = _useSelect.isInserterEnabled,
    isTextModeEnabled = _useSelect.isTextModeEnabled,
    showIconLabels = _useSelect.showIconLabels,
    previewDeviceType = _useSelect.previewDeviceType,
    isInserterOpened = _useSelect.isInserterOpened,
    isListViewOpen = _useSelect.isListViewOpen,
    listViewShortcut = _useSelect.listViewShortcut;
  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var _props$settings$iso$t = props.settings.iso.toolbar,
    inserter = _props$settings$iso$t.inserter,
    navigation = _props$settings$iso$t.navigation,
    undo = _props$settings$iso$t.undo,
    selectorTool = _props$settings$iso$t.selectorTool;
  var inserterInSidebar = ((_props$settings = props.settings) === null || _props$settings === void 0 || (_props$settings = _props$settings.iso) === null || _props$settings === void 0 || (_props$settings = _props$settings.sidebar) === null || _props$settings === void 0 ? void 0 : _props$settings.inserter) || false;
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || fixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  (0, _i18n.__)('Document and block tools') : /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  (0, _i18n.__)('Document tools');
  var openInserter = (0, _element.useCallback)(function () {
    if (isInserterOpened) {
      // Focusing the inserter button closes the inserter popover
      // @ts-ignore
      setIsInserterOpened(false);
    } else {
      setIsInserterOpened(true);
    }
  }, [isInserterOpened, setIsInserterOpened]);
  var toggleListView = (0, _element.useCallback)(function () {
    return setIsListViewOpened(!isListViewOpen);
  }, [setIsListViewOpened, isListViewOpen]);
  return createElement(_blockEditor.NavigableToolbar, {
    className: "editor-document-tools edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (inserter || undo || navigation || selectorTool) && createElement("div", {
    className: "editor-document-tools__left edit-post-header-toolbar__left"
  }, inserter && createElement(_components.ToolbarItem, {
    ref: inserterButton,
    as: _components.Button,
    className: "editor-document-tools__inserter-toggle",
    isPressed: isInserterOpened,
    onMouseDown: preventDefault,
    onClick: openInserter,
    disabled: !isInserterEnabled,
    isPrimary: true,
    icon: _icons.plus
    /* translators: button label text should, if possible, be under 16
    characters. */,
    label: (0, _i18n._x)('Toggle block inserter', 'Generic label for block inserter button'),
    showTooltip: !showIconLabels
  }), isInserterOpened && !inserterInSidebar && createElement(_components.Popover, {
    position: "bottom right",
    onClose: function onClose() {
      return setIsInserterOpened(false);
    },
    anchor: inserterButton.current
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
    as: _blockNavigation["default"],
    isDisabled: isTextModeEnabled
  }), navigation && inserterInSidebar && createElement(_components.ToolbarItem, {
    as: _components.Button,
    className: "edit-post-header-toolbar__list-view-toggle",
    icon: _icons.listView,
    disabled: isTextModeEnabled,
    isPressed: isListViewOpen
    /* translators: button label text should, if possible, be under 16 characters. */,
    label: (0, _i18n.__)('List View'),
    onClick: toggleListView,
    shortcut: listViewShortcut,
    showTooltip: !showIconLabels
  })));
}
var _default = exports["default"] = HeaderToolbar;
//# sourceMappingURL=index.js.map