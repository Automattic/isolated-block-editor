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
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
var BlockEditorToolbar = function BlockEditorToolbar(props) {
  var _settings$iso;

  var settings = props.settings,
      editorMode = props.editorMode,
      renderMoreMenu = props.renderMoreMenu;
  var shortcut = 'x';

  var _ref = ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.toolbar) || {},
      inspector = _ref.inspector,
      documentInspector = _ref.documentInspector;

  var _ref2 = settings.iso || {},
      moreMenu = _ref2.moreMenu;

  var _useDispatch = (0, _data.useDispatch)('isolated/editor'),
      setInspecting = _useDispatch.setInspecting;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      isInspecting: select('isolated/editor').isInspecting(),
      isBlockSelected: !!select('core/block-editor').getBlockSelectionStart()
    };
  }, []),
      isInspecting = _useSelect.isInspecting,
      isBlockSelected = _useSelect.isBlockSelected;

  (0, _element.useEffect)(function () {
    // Close the block inspector when no block is selected. Gutenberg gets a bit crashy otherwise
    if (isInspecting && !isBlockSelected) {
      setInspecting(false);
    }
  }, [isBlockSelected]);
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
    className: "edit-post-header__settings"
  }, createElement(_slot["default"].Slot, null), inspector && createElement(_components.Button, {
    icon: _icons.cog,
    label: (0, _i18n.__)('Settings'),
    onClick: function onClick() {
      return setInspecting(!isInspecting);
    },
    isPressed: isInspecting,
    "aria-expanded": isInspecting,
    shortcut: shortcut,
    disabled: editorMode === 'text'
  }), isInspecting && createElement(_inspector["default"], {
    documentInspector: documentInspector,
    blockSelected: isBlockSelected
  }), moreMenu && createElement(_moreMenu["default"], {
    settings: settings,
    onClick: function onClick() {
      return setInspecting(false);
    },
    renderMoreMenu: renderMoreMenu
  }))));
};

var _default = BlockEditorToolbar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map