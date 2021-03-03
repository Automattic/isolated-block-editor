import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuGroup, MenuItem } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { check } from '@wordpress/icons';
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

  return createElement(MenuGroup, {
    label: _x('Editor', 'noun')
  }, createElement(MenuItem, {
    icon: editorMode === 'visual' && check,
    isSelected: editorMode === 'visual',
    onClick: function onClick() {
      return setMode('visual');
    },
    role: "menuitemcheckbox"
  }, __('Visual editor')), createElement(MenuItem, {
    icon: editorMode === 'text' && check,
    isSelected: editorMode === 'text',
    onClick: function onClick() {
      return setMode('text');
    },
    role: "menuitemcheckbox"
  }, __('Code editor')));
}

export default compose([withSelect(function (select) {
  var _select = select('isolated/editor'),
      getEditorMode = _select.getEditorMode;

  var _select$getEditorSett = select('core/editor').getEditorSettings(),
      codeEditingEnabled = _select$getEditorSett.codeEditingEnabled;

  return {
    editorMode: getEditorMode(),
    isCodeEditingEnabled: codeEditingEnabled
  };
}), withDispatch(function (dispatch) {
  return {
    onSetMode: function onSetMode(mode) {
      dispatch('isolated/editor').setEditorMode(mode);
    }
  };
})])(EditorMenu);
//# sourceMappingURL=editor-menu.js.map