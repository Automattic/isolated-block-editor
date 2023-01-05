import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
const {
  Fill,
  Slot
} = createSlotFill('IsolatedFooter');
const ActionArea = _ref => {
  let {
    children
  } = _ref;
  return createElement(Fill, null, children);
};
ActionArea.Slot = function () {
  return createElement(Slot, null, fills => fills);
};
export default ActionArea;
//# sourceMappingURL=index.js.map