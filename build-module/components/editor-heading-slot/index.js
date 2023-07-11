import { createElement } from "@wordpress/element";
import { createSlotFill } from '@wordpress/components';
const {
  Fill,
  Slot
} = createSlotFill('IsolatedEditorHeading');
const EditorHeading = ({
  children
}) => {
  return createElement(Fill, null, children);
};
EditorHeading.Slot = function (props) {
  return createElement(Slot, null, fills => fills);
};
export default EditorHeading;
//# sourceMappingURL=index.js.map