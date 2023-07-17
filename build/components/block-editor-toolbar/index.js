"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _element = require("@wordpress/element");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _moreMenu = _interopRequireDefault(require("./more-menu"));
var _headerToolbar = _interopRequireDefault(require("./header-toolbar"));
var _inspector = _interopRequireDefault(require("./inspector"));
var _slot = _interopRequireDefault(require("./slot"));
require("./style.scss");
import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
var BlockEditorToolbar = function BlockEditorToolbar(props) {
  var _settings$iso, _settings$iso2;
  var ref = (0, _element.useRef)(null);
  var settings = props.settings,
    editorMode = props.editorMode,
    renderMoreMenu = props.renderMoreMenu;
  var isHugeViewport = (0, _compose.useViewportMatch)('huge', '>=');
  var _ref = ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.toolbar) || {},
    inspector = _ref.inspector;
  var _ref2 = settings.iso || {},
    moreMenu = _ref2.moreMenu;
  var inspectorInSidebar = (settings === null || settings === void 0 || (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 || (_settings$iso2 = _settings$iso2.sidebar) === null || _settings$iso2 === void 0 ? void 0 : _settings$iso2.inspector) || false;
  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
    openGeneralSidebar = _useDispatch.openGeneralSidebar,
    closeGeneralSidebar = _useDispatch.closeGeneralSidebar;
  var _useDispatch2 = (0, _data.useDispatch)('isolated/editor'),
    setIsInserterOpened = _useDispatch2.setIsInserterOpened;
  var _useSelect = (0, _data.useSelect)(function (select) {
      return {
        isEditing: select('isolated/editor'),
        // @ts-ignore
        isEditorSidebarOpened: select('isolated/editor').isEditorSidebarOpened(),
        // @ts-ignore
        isBlockSelected: !!select('core/block-editor').getBlockSelectionStart(),
        // @ts-ignore
        hasBlockSelected: !!select('core/block-editor').getBlockSelectionStart(),
        // @ts-ignore
        isInserterOpened: select('isolated/editor').isInserterOpened()
      };
    }, []),
    isEditorSidebarOpened = _useSelect.isEditorSidebarOpened,
    isBlockSelected = _useSelect.isBlockSelected,
    hasBlockSelected = _useSelect.hasBlockSelected,
    isInserterOpened = _useSelect.isInserterOpened,
    isEditing = _useSelect.isEditing;
  function toggleSidebar(isOpen) {
    if (!isOpen) {
      closeGeneralSidebar();
    } else {
      openGeneralSidebar(hasBlockSelected ? 'edit-post/block' : 'edit-post/document');
    }
  }

  // If in popover mode then ensure the sidebar is closed when the editor is first started. This is because the complimentary area status
  // is saved to localStorage, and it might have been left open when in sidebar mode.
  (0, _element.useEffect)(function () {
    if (!inspectorInSidebar) {
      closeGeneralSidebar();
    }
  }, []);
  (0, _element.useEffect)(function () {
    // Close the block inspector when no block is selected. Gutenberg gets a bit crashy otherwise
    if (!inspectorInSidebar && !isEditing && !isBlockSelected && isEditorSidebarOpened) {
      closeGeneralSidebar();
    }
  }, [isEditing]);

  // Inserter and Sidebars are mutually exclusive
  (0, _element.useEffect)(function () {
    if (isEditorSidebarOpened && !isHugeViewport) {
      setIsInserterOpened(false);
    }
  }, [isEditorSidebarOpened, isHugeViewport]);
  (0, _element.useEffect)(function () {
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
  }, createElement(_headerToolbar["default"], {
    settings: settings
  })), createElement("div", {
    className: "edit-post-header__settings",
    ref: ref
  }, createElement(_slot["default"].Slot, null), inspector && createElement(_components.Button, {
    icon: _icons.cog,
    label: (0, _i18n.__)('Settings'),
    onClick: function onClick() {
      return toggleSidebar(!isEditorSidebarOpened);
    },
    isPressed: isEditorSidebarOpened,
    "aria-expanded": isEditorSidebarOpened,
    disabled: editorMode === 'text'
  }), isEditorSidebarOpened && !inspectorInSidebar && createElement(_inspector["default"], {
    button: ref,
    onToggle: toggleSidebar
  }), moreMenu && createElement(_moreMenu["default"], {
    settings: settings,
    onClick: function onClick() {
      return closeGeneralSidebar();
    },
    renderMoreMenu: renderMoreMenu
  }))));
};
var _default = BlockEditorToolbar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map