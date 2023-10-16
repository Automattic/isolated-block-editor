import { createElement } from "react";
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
const {
  Fill,
  Slot
} = createSlotFill('PluginDocumentSettingPanel');
const DocumentSection = ({
  children
}) => {
  return createElement(Fill, null, children);
};
DocumentSection.Slot = function (props) {
  return createElement(Slot, null, fills => fills ? fills : createElement("span", {
    className: "block-editor-block-inspector__no-blocks"
  }, __('Nothing to display')));
};
export default DocumentSection;
//# sourceMappingURL=index.js.map