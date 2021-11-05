/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';
export function isEditingReusableBlock() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  if ((action === null || action === void 0 ? void 0 : action.type) === 'SET_EDITING_REUSABLE_BLOCK') {
    return { ...state,
      [action.clientId]: action.isEditing
    };
  }

  return state;
}
export default combineReducers({
  isEditingReusableBlock
});
//# sourceMappingURL=reducer.js.map