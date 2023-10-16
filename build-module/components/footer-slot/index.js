import { createElement } from "react";
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
const {
  Fill,
  Slot
} = createSlotFill('IsolatedFooter');
const FooterSection = ({
  children
}) => {
  return createElement(Fill, null, children);
};
FooterSection.Slot = function (props) {
  return createElement(Slot, null, fills => fills);
};
export default FooterSection;
//# sourceMappingURL=index.js.map