/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('IsolatedToolbar');

/**
 * A Toolbar slot/fill
 *
 * @param {Object} props Component props
 * @param {Object} props.children Child components to insert in the toolbar slot
 * @return object
 */
const ToolbarSlot = ({
  children
}) => {
  return /*#__PURE__*/_jsx(Fill, {
    children: children
  });
};
ToolbarSlot.Slot = function (props) {
  return /*#__PURE__*/_jsx(Slot, {
    children: fills => fills
  });
};
export default ToolbarSlot;
//# sourceMappingURL=slot.js.map