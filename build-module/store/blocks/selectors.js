/**
 * Internal dependencies
 */
import { getEditorMode } from '../editor/selectors';
/**
 * Get blocks from edit history
 *
 * @param {Object} state - Current state
 * @return {object[]}
 */

export function getBlocks(state) {
  return state.blocks.present.blocks;
}
/**
 * Get selection
 *
 * @param {Object} state - Current state
 * @return {Object}
 */

export function getEditorSelection(state) {
  return state.blocks.present.selection;
}
/**
 * Is undo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */

export function hasEditorUndo(state) {
  var _state$collab;

  if (getEditorMode(state) !== 'visual') return false;

  if ((_state$collab = state.collab) !== null && _state$collab !== void 0 && _state$collab.undoManager) {
    return !!state.collab.undoManager.undoStack.length;
  }

  return state.blocks.past.length > 0;
}
/**
 * Is redo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */

export function hasEditorRedo(state) {
  var _state$collab2;

  if (getEditorMode(state) !== 'visual') return false;

  if ((_state$collab2 = state.collab) !== null && _state$collab2 !== void 0 && _state$collab2.undoManager) {
    return !!state.collab.undoManager.redoStack.length;
  }

  return state.blocks.future.length > 0;
}
/**
 * Get current edit count
 *
 * @param {Object} state - Current state
 * @return {number}
 */

export function getEditCount(state) {
  return state.blocks.present.editCount;
}
//# sourceMappingURL=selectors.js.map