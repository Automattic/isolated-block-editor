import { createElement } from "@wordpress/element";
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
function LinkMenu(_ref) {
  let {
    settings
  } = _ref;
  const {
    linkMenu = []
  } = settings.iso || {};
  if (linkMenu.length === 0) {
    return null;
  }
  return createElement(MenuGroup, {
    label: __('Links')
  }, linkMenu.map(_ref2 => {
    let {
      title,
      url
    } = _ref2;
    return createElement(MenuItem, {
      key: title
    }, createElement(ExternalLink, {
      href: url
    }, title));
  }));
}
export default LinkMenu;
//# sourceMappingURL=link-menu.js.map