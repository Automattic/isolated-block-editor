/**
 * WordPress dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MenuItem, ExternalLink } from '@wordpress/components';

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Link menu
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 */
import { jsx as _jsx } from "react/jsx-runtime";
function LinkMenu({
  settings
}) {
  const {
    linkMenu = []
  } = settings.iso || {};
  if (linkMenu.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(MenuGroup, {
    label: __('Links'),
    children: linkMenu.map(({
      title,
      url
    }) => /*#__PURE__*/_jsx(MenuItem, {
      children: /*#__PURE__*/_jsx(ExternalLink, {
        href: url,
        children: title
      })
    }, title))
  });
}
export default LinkMenu;
//# sourceMappingURL=link-menu.js.map