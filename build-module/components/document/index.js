import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

var _createSlotFill = createSlotFill('PluginDocumentSettingPanel'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var DocumentSection = function DocumentSection(_ref) {
  var children = _ref.children;
  return createElement(Fill, null, children);
};

DocumentSection.Slot = function (props) {
  return createElement(Slot, null, function (fills) {
    return fills.length === 0 ? createElement("span", {
      className: "block-editor-block-inspector__no-blocks"
    }, __('Nothing to display')) : fills;
  });
};

export default DocumentSection;
//# sourceMappingURL=index.js.map