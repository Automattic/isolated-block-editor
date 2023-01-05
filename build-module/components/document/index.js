import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
const {
  Fill,
  Slot
} = createSlotFill('PluginDocumentSettingPanel');
const DocumentSection = _ref => {
  let {
    children
  } = _ref;
  return createElement(Fill, null, children);
};
DocumentSection.Slot = function (props) {
  return createElement(Slot, null, fills => fills.length === 0 ? createElement("span", {
    className: "block-editor-block-inspector__no-blocks"
  }, __('Nothing to display')) : fills);
};
export default DocumentSection;
//# sourceMappingURL=index.js.map