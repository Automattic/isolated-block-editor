import { createSlotFill } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Fill,
  Slot
} = createSlotFill('IsolatedEditorHeading');
const EditorHeading = ({
  children
}) => {
  return /*#__PURE__*/_jsx(Fill, {
    children: children
  });
};
EditorHeading.Slot = function (props) {
  return /*#__PURE__*/_jsx(Slot, {
    children: fills => fills
  });
};
export default EditorHeading;
//# sourceMappingURL=index.js.map