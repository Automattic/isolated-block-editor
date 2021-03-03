import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import WritingMenu from './writing-menu';
import EditorMenu from './editor-menu';
import LinkMenu from './link-menu';
/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Close dropdown callback
 * @callback OnClose
 */

/**
 * More menu render callback
 * @callback OnMore
 * @param {BlockEditorSettings} settings - Settings
 * @param {OnClose} onClose - Callback to close the menu
 */

var POPOVER_PROPS = {
  className: 'edit-post-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};
/**
 * More menu
 *
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */

var MoreMenu = function MoreMenu(_ref) {
  var settings = _ref.settings,
      onClick = _ref.onClick,
      renderMoreMenu = _ref.renderMoreMenu;
  return createElement(DropdownMenu, {
    className: "edit-post-more-menu",
    icon: moreVertical,
    label: __('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: _objectSpread(_objectSpread({}, TOGGLE_PROPS), {}, {
      onClick: onClick
    })
  }, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, renderMoreMenu && renderMoreMenu(settings, onClose), createElement(EditorMenu, {
      onClose: onClose,
      settings: settings
    }), createElement(WritingMenu, {
      onClose: onClose,
      settings: settings
    }), createElement(LinkMenu, {
      settings: settings
    }));
  });
};

export default MoreMenu;
//# sourceMappingURL=index.js.map