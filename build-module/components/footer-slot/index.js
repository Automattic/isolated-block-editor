/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('IsolatedFooter');
const FooterSection = ({
  children
}) => {
  return /*#__PURE__*/_jsx(Fill, {
    children: children
  });
};
FooterSection.Slot = function (props) {
  return /*#__PURE__*/_jsx(Slot, {
    children: fills => fills
  });
};
export default FooterSection;
//# sourceMappingURL=index.js.map