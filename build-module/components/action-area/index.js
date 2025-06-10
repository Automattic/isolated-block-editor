/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('IsolatedFooter');
const ActionArea = ({
  children
}) => {
  return /*#__PURE__*/_jsx(Fill, {
    children: children
  });
};
ActionArea.Slot = function () {
  return /*#__PURE__*/_jsx(Slot, {
    children: fills => fills
  });
};
export default ActionArea;
//# sourceMappingURL=index.js.map