import { createElement } from "react";
/**
 * WordPress dependencies
 */
import { privateApis as componentsPrivateApis } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from './unlock';
export const sidebars = {
  document: 'edit-post/document',
  block: 'edit-post/block'
};
const {
  Tabs
} = unlock(componentsPrivateApis);
const SettingsHeader = ({
  documentInspector
}) => {
  const {
    documentLabel
  } = useSelect(select => {
    const hasCustomLabel = documentInspector && typeof documentInspector === 'string';
    return {
      // translators: Default label for the Document sidebar tab, not selected.
      documentLabel: hasCustomLabel ? documentInspector : _x('Document', 'noun')
    };
  }, []);

  /* Use a list so screen readers will announce how many tabs there are. */
  return createElement(Tabs.TabList, null, createElement(Tabs.Tab, {
    tabId: sidebars.document
  }, documentLabel), createElement(Tabs.Tab, {
    tabId: sidebars.block
  }, __('Block')));
};
export default SettingsHeader;
//# sourceMappingURL=sidebar-heading.js.map