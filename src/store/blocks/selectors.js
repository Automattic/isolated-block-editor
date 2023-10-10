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
export function getBlocks( state ) {
	return state.blocks.present.blocks;
}

/**
 * Get selection
 *
 * @param {Object} state - Current state
 * @return {Object}
 */
export function getEditorSelection( state ) {
	return state.blocks.present.selection;
}

/**
 * Is undo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
export function hasEditorUndo( state ) {
	if ( getEditorMode( state ) !== 'visual' ) return false;

	return state.blocks.past.length > 0;
}

/**
 * Is redo possible?
 *
 * @param {Object} state - Current state
 * @return {boolean}
 */
export function hasEditorRedo( state ) {
	if ( getEditorMode( state ) !== 'visual' ) return false;

	return state.blocks.future.length > 0;
}

/**
 * Get current edit count
 *
 * @param {Object} state - Current state
 * @return {number}
 */
export function getEditCount( state ) {
	return state.blocks.present.editCount;
}
