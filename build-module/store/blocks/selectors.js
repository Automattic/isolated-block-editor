import { getEditorMode } from '../editor/selectors';
/**
 * Get blocks from edit history
 * @param {object} state - Current state
 * @returns {object[]}
 */

export function getBlocks(state) {
  return state.blocks.present.blocks;
}
/**
 * Get selection
 * @param {object} state - Current state
 * @returns {object}
 */

export function getEditorSelection(state) {
  return state.blocks.present.selection;
}
/**
 * Is undo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */

export function hasEditorUndo(state) {
  return state.blocks.past.length > 0 && getEditorMode(state) === 'visual';
}
/**
 * Is redo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */

export function hasEditorRedo(state) {
  return state.blocks.future.length > 0 && getEditorMode(state) === 'visual';
}
/**
 * Get current edit count
 * @param {object} state - Current state
 * @returns {number}
 */

export function getEditCount(state) {
  return state.blocks.present.editCount;
}
//# sourceMappingURL=selectors.js.map