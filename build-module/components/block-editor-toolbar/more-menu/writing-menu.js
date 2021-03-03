import { createElement, Fragment } from "@wordpress/element";

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
 * @param {object} props - Component props
 * @param {OnClose} props.onClose - Close the menu
 * @param {BlockEditorSettings} props.settings - Settings
 */

function WritingMenu(_ref) {
  var onClose = _ref.onClose,
      settings = _ref.settings;
  var _settings$iso$moreMen = settings.iso.moreMenu,
      preview = _settings$iso$moreMen.preview,
      fullscreen = _settings$iso$moreMen.fullscreen,
      topToolbar = _settings$iso$moreMen.topToolbar;

  var _useSelect = useSelect(function (select) {
    return {
      isFullscreen: select('isolated/editor').isOptionActive('fullscreenMode')
    };
  }, []),
      isFullscreen = _useSelect.isFullscreen; // Anything to show?


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