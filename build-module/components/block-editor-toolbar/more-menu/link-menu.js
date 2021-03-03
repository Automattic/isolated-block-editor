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
 * @param {object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 */

function LinkMenu(_ref) {
  var settings = _ref.settings;
  var linkMenu = settings.iso.linkMenu;

  if (linkMenu.length === 0) {
    return null;
  }

  return createElement(MenuGroup, {
    label: __('Links')
  }, linkMenu.map(function (_ref2) {
    var title = _ref2.title,
        url = _ref2.url;
    return createElement(MenuItem, {
      key: title
    }, createElement(ExternalLink, {
      href: url
    }, title));
  }));
}

export default LinkMenu;
//# sourceMappingURL=link-menu.js.map