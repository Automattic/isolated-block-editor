"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _toggleFeature = _interopRequireDefault(require("../toggle-feature"));

var _toggleOption = _interopRequireDefault(require("../toggle-option"));

import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      isFullscreen: select('isolated/editor').isOptionActive('fullscreenMode')
    };
  }, []),
      isFullscreen = _useSelect.isFullscreen; // Anything to show?


  if (!fullscreen && !preview && !topToolbar) {
    return null;
  }

  return createElement(_components.MenuGroup, {
    label: (0, _i18n._x)('View', 'noun')
  }, topToolbar && createElement(Fragment, null, createElement(_toggleFeature["default"], {
    feature: "fixedToolbar",
    label: (0, _i18n.__)('Top toolbar'),
    info: (0, _i18n.__)('Access all block and document tools in a single place.'),
    messageActivated: (0, _i18n.__)('Top toolbar activated'),
    messageDeactivated: (0, _i18n.__)('Top toolbar deactivated'),
    onClose: onClose
  })), fullscreen && createElement(_toggleOption["default"], {
    option: "fullscreenMode",
    label: (0, _i18n.__)('Fullscreen'),
    info: (0, _i18n.__)('Show editor fullscreen.'),
    onClose: onClose
  }), preview && !isFullscreen && createElement(_toggleOption["default"], {
    option: "preview",
    label: (0, _i18n.__)('Preview'),
    info: (0, _i18n.__)('Preview the content before posting.'),
    onClose: onClose
  }));
}

var _default = WritingMenu;
exports["default"] = _default;
//# sourceMappingURL=writing-menu.js.map