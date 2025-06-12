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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  return /*#__PURE__*/_jsxs(Tabs.TabList, {
    children: [!!documentInspector && /*#__PURE__*/_jsx(Tabs.Tab, {
      tabId: sidebars.document,
      children: documentLabel
    }), /*#__PURE__*/_jsx(Tabs.Tab, {
      tabId: sidebars.block,
      children: __('Block')
    })]
  });
};
export default SettingsHeader;
//# sourceMappingURL=sidebar-heading.js.map