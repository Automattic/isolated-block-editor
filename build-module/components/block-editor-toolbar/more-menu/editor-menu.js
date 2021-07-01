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

function EditorMenu({
  onClose,
  editorMode,
  onSetMode,
  isCodeEditingEnabled,
  settings
}) {
  var _settings$iso, _settings$iso2, _settings$iso2$moreMe;

  /**
   * @param {string} mode
   */
  const setMode = mode => {
    onSetMode(mode);
    onClose();
  };

  if (!isCodeEditingEnabled) {
    return null;
  }

  if ((settings === null || settings === void 0 ? void 0 : (_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.moreMenu) === false || !(settings !== null && settings !== void 0 && (_settings$iso2 = settings.iso) !== null && _settings$iso2 !== void 0 && (_settings$iso2$moreMe = _settings$iso2.moreMenu) !== null && _settings$iso2$moreMe !== void 0 && _settings$iso2$moreMe.editor)) {
    return null;
  }

  return createElement(MenuGroup, {
    label: _x('Editor', 'noun')
  }, createElement(MenuItem, {
    icon: editorMode === 'visual' && check,
    isSelected: editorMode === 'visual',
    onClick: () => setMode('visual'),
    role: "menuitemcheckbox"
  }, __('Visual editor')), createElement(MenuItem, {
    icon: editorMode === 'text' && check,
    isSelected: editorMode === 'text',
    onClick: () => setMode('text'),
    role: "menuitemcheckbox"
  }, __('Code editor')));
}

export default compose([withSelect(select => {
  const {
    getEditorMode
  } = select('isolated/editor');
  const {
    codeEditingEnabled
  } = select('core/editor').getEditorSettings();
  return {
    editorMode: getEditorMode(),
    isCodeEditingEnabled: codeEditingEnabled
  };
}), withDispatch(dispatch => ({
  onSetMode(mode) {
    dispatch('isolated/editor').setEditorMode(mode);
  }

}))])(EditorMenu);
//# sourceMappingURL=editor-menu.js.map