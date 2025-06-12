/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('PluginDocumentSettingPanel');
const DocumentSection = ({
  children
}) => {
  return /*#__PURE__*/_jsx(Fill, {
    children: children
  });
};
DocumentSection.Slot = function (props) {
  return /*#__PURE__*/_jsx(Slot, {
    children: fills => fills ? fills : /*#__PURE__*/_jsx("span", {
      className: "block-editor-block-inspector__no-blocks",
      children: __('Nothing to display')
    })
  });
};
export default DocumentSection;
//# sourceMappingURL=index.js.map