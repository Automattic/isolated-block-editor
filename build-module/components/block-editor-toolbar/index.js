import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { cog } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import MoreMenu from './more-menu';
import HeaderToolbar from './header-toolbar';
import Inspector from './inspector';
import './style.scss';
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

const BlockEditorToolbar = props => {
  var _settings$iso;

  const {
    settings,
    editorMode,
    renderMoreMenu
  } = props;
  const shortcut = 'x';
  const {
    inspector,
    documentInspector
  } = ((_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.toolbar) || {};
  const {
    moreMenu
  } = settings.iso || {};
  const {
    setInspecting
  } = useDispatch('isolated/editor');
  const {
    isInspecting,
    isBlockSelected
  } = useSelect(select => ({
    isInspecting: select('isolated/editor').isInspecting(),
    isBlockSelected: !!select('core/block-editor').getBlockSelectionStart()
  }), []);
  useEffect(() => {
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
  }, createElement(HeaderToolbar, {
    settings: settings
  })), createElement("div", {
    className: "edit-post-header__settings"
  }, inspector && createElement(Button, {
    icon: cog,
    label: __('Settings'),
    onClick: () => setInspecting(!isInspecting),
    isPressed: isInspecting,
    "aria-expanded": isInspecting,
    shortcut: shortcut,
    disabled: editorMode === 'text'
  }), isInspecting && createElement(Inspector, {
    documentInspector: documentInspector,
    blockSelected: isBlockSelected
  }), moreMenu && createElement(MoreMenu, {
    settings: settings,
    onClick: () => setInspecting(false),
    renderMoreMenu: renderMoreMenu
  }))));
};

export default BlockEditorToolbar;
//# sourceMappingURL=index.js.map