// @ts-nocheck
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
 *
 * @callback OnClose
 */

/**
 * More menu render callback
 *
 * @callback OnMore
 * @param {BlockEditorSettings} settings - Settings
 * @param {OnClose} onClose - Callback to close the menu
 */
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const POPOVER_PROPS = {
  className: 'edit-post-more-menu__content',
  position: 'bottom left'
};
const TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};

/**
 * More menu
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */
const MoreMenu = ({
  settings,
  onClick,
  renderMoreMenu
}) => /*#__PURE__*/_jsx(DropdownMenu, {
  className: "edit-post-more-menu",
  icon: moreVertical,
  label: __('More tools & options'),
  popoverProps: POPOVER_PROPS,
  toggleProps: {
    ...TOGGLE_PROPS,
    onClick
  },
  children: ({
    onClose
  }) => /*#__PURE__*/_jsxs(_Fragment, {
    children: [renderMoreMenu && renderMoreMenu(settings, onClose), /*#__PURE__*/_jsx(EditorMenu, {
      onClose: onClose,
      settings: settings
    }), /*#__PURE__*/_jsx(WritingMenu, {
      onClose: onClose,
      settings: settings
    }), /*#__PURE__*/_jsx(LinkMenu, {
      settings: settings
    })]
  })
});
export default MoreMenu;
//# sourceMappingURL=index.js.map