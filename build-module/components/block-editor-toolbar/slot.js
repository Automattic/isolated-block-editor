import { createElement } from "react";
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
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
  return createElement(Fill, null, children);
};
ToolbarSlot.Slot = function (props) {
  return createElement(Slot, null, fills => fills);
};
export default ToolbarSlot;
//# sourceMappingURL=slot.js.map