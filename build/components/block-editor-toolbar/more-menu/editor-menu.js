"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _icons = require("@wordpress/icons");

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/** @typedef {import('./index').OnClose} OnClose */

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Close dropdown callback
 * @callback OnSetMode
 * @param {string} mode
 */

/**
 * The 'more menu' editor section
 *
 * @param {object} props - Component props
 * @param {boolean} props.isCodeEditingEnabled
 * @param {string} props.editorMode
 * @param {OnClose} props.onClose - Callback to close the menu
 * @param {OnSetMode} props.onSetMode
 * @param {BlockEditorSettings} props.settings - Settings
 */
function EditorMenu(_ref) {
  var onClose = _ref.onClose,
      editorMode = _ref.editorMode,
      onSetMode = _ref.onSetMode,
      isCodeEditingEnabled = _ref.isCodeEditingEnabled,
      settings = _ref.settings;

  /**
   * @param {string} mode
   */
  var setMode = function setMode(mode) {
    onSetMode(mode);
    onClose();
  };

  if (!isCodeEditingEnabled || !settings.iso.moreMenu.editor) {
    return null;
  }

  return createElement(_components.MenuGroup, {
    label: (0, _i18n._x)('Editor', 'noun')
  }, createElement(_components.MenuItem, {
    icon: editorMode === 'visual' && _icons.check,
    isSelected: editorMode === 'visual',
    onClick: function onClick() {
      return setMode('visual');
    },
    role: "menuitemcheckbox"
  }, (0, _i18n.__)('Visual editor')), createElement(_components.MenuItem, {
    icon: editorMode === 'text' && _icons.check,
    isSelected: editorMode === 'text',
    onClick: function onClick() {
      return setMode('text');
    },
    role: "menuitemcheckbox"
  }, (0, _i18n.__)('Code editor')));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
      getEditorMode = _select.getEditorMode;

  var _select$getEditorSett = select('core/editor').getEditorSettings(),
      codeEditingEnabled = _select$getEditorSett.codeEditingEnabled;

  return {
    editorMode: getEditorMode(),
    isCodeEditingEnabled: codeEditingEnabled
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onSetMode: function onSetMode(mode) {
      dispatch('isolated/editor').setEditorMode(mode);
    }
  };
})])(EditorMenu);

exports["default"] = _default;
//# sourceMappingURL=editor-menu.js.map