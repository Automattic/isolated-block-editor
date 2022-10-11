import { createElement, Fragment } from "@wordpress/element";
// @ts-nocheck

/**
 * WordPress dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import FeatureToggle from '../toggle-feature';
import OptionToggle from '../toggle-option';
/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('./index').OnClose} OnClose */

/**
 * Writing menu
 *
 * @param {Object} props - Component props
 * @param {OnClose} props.onClose - Close the menu
 * @param {BlockEditorSettings} props.settings - Settings
 */

function WritingMenu(_ref) {
  var _settings$iso;

  let {
    onClose,
    settings
  } = _ref;
  const {
    preview,
    fullscreen,
    topToolbar
  } = (settings === null || settings === void 0 ? void 0 : (_settings$iso = settings.iso) === null || _settings$iso === void 0 ? void 0 : _settings$iso.moreMenu) || {};
  const {
    isFullscreen
  } = useSelect(select => ({
    isFullscreen: select('isolated/editor').isOptionActive('fullscreenMode')
  }), []); // Anything to show?

  if (!fullscreen && !preview && !topToolbar) {
    return null;
  }

  return createElement(MenuGroup, {
    label: _x('View', 'noun')
  }, topToolbar && createElement(Fragment, null, createElement(FeatureToggle, {
    feature: "fixedToolbar",
    label: __('Top toolbar'),
    info: __('Access all block and document tools in a single place.'),
    messageActivated: __('Top toolbar activated'),
    messageDeactivated: __('Top toolbar deactivated'),
    onClose: onClose
  })), fullscreen && createElement(OptionToggle, {
    option: "fullscreenMode",
    label: __('Fullscreen'),
    info: __('Show editor fullscreen.'),
    onClose: onClose
  }), preview && !isFullscreen && createElement(OptionToggle, {
    option: "preview",
    label: __('Preview'),
    info: __('Preview the content before posting.'),
    onClose: onClose
  }));
}

export default WritingMenu;
//# sourceMappingURL=writing-menu.js.map