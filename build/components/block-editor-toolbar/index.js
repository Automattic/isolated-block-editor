"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _blockEditor = require("@wordpress/block-editor");
var _element = require("@wordpress/element");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _compose = require("@wordpress/compose");
var _classnames = _interopRequireDefault(require("classnames"));
var _moreMenu = _interopRequireDefault(require("./more-menu"));
var _headerToolbar = _interopRequireDefault(require("./header-toolbar"));
var _inspector = _interopRequireDefault(require("./inspector"));
var _slot = _interopRequireDefault(require("./slot"));
require("./style.scss");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * WordPress dependencies
 */

/**
 * External dependencies
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
 */var BlockEditorToolbar = function BlockEditorToolbar(props) {
  var _settings$iso, _settings$iso2;
  var ref = (0, _element.useRef)(null);
  var settings = props.settings,
    editorMode = props.editorMode,
    renderMoreMenu = props.renderMoreMenu;
  var isHugeViewport = (0, _compose.useViewportMatch)('huge', '>=');
  var blockToolbarRef = (0, _element.useRef)(null);
  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
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
  var _useState = (0, _element.useState)(true),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    isBlockToolsCollapsed = _useState2[0],
    setIsBlockToolsCollapsed = _useState2[1];
  (0, _element.useEffect)(function () {
    // If we have a new block selection, show the block tools
    if (isBlockSelected) {
      setIsBlockToolsCollapsed(false);
    }
  }, [isBlockSelected]);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "edit-post-editor-regions__header",
    role: "region",
    tabIndex: -1,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "editor-header edit-post-header",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "editor-header__toolbar",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_headerToolbar["default"], {
          settings: settings
        }), isLargeViewport && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: (0, _classnames["default"])('editor-collapsible-block-toolbar', {
              'is-collapsed': isBlockToolsCollapsed
            }),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockToolbar, {
              hideDragHandle: true
            })
          }),
          /*#__PURE__*/
          // @ts-ignore
          (0, _jsxRuntime.jsx)(_components.Popover.Slot, {
            ref: blockToolbarRef,
            name: "block-toolbar"
          }), isBlockSelected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Button, {
            className: "edit-post-header__block-tools-toggle",
            icon: isBlockToolsCollapsed ? _icons.next : _icons.previous,
            onClick: function onClick() {
              setIsBlockToolsCollapsed(function (collapsed) {
                return !collapsed;
              });
            },
            label: isBlockToolsCollapsed ? (0, _i18n.__)('Show block tools') : (0, _i18n.__)('Hide block tools')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "editor-header__settings",
        ref: ref,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_slot["default"].Slot, {}), inspector && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Button, {
          icon: _icons.cog,
          label: (0, _i18n.__)('Settings'),
          onClick: function onClick() {
            return toggleSidebar(!isEditorSidebarOpened);
          },
          isPressed: isEditorSidebarOpened,
          "aria-expanded": isEditorSidebarOpened,
          disabled: editorMode === 'text'
        }), isEditorSidebarOpened && !inspectorInSidebar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_inspector["default"], {
          button: ref,
          onToggle: toggleSidebar
        }), moreMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)(_moreMenu["default"], {
          settings: settings,
          onClick: function onClick() {
            return closeGeneralSidebar();
          },
          renderMoreMenu: renderMoreMenu
        })]
      })]
    })
  });
};
var _default = exports["default"] = BlockEditorToolbar;
//# sourceMappingURL=index.js.map