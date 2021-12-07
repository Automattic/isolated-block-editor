import { getEditorMode } from '../editor/selectors';

/**
 * Get blocks from edit history
 * @param {object} state - Current state
 * @returns {object[]}
 */
export function getBlocks( state ) {
	return state.blocks.present.blocks;
}

/**
 * Get selection
 * @param {object} state - Current state
 * @returns {object}
 */
export function getEditorSelection( state ) {
	return state.blocks.present.selection;
}

/**
 * Is undo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */
export function hasEditorUndo( state ) {
	if ( getEditorMode( state ) !== 'visual' ) return false;

	if ( state.collab?.undoManager ) {
		return !! state.collab.undoManager.undoStack.length;
	}

	return state.blocks.past.length > 0;
}

/**
 * Is redo possible?
 * @param {object} state - Current state
 * @returns {boolean}
 */
export function hasEditorRedo( state ) {
	if ( getEditorMode( state ) !== 'visual' ) return false;

	if ( state.collab?.undoManager ) {
		return !! state.collab.undoManager.redoStack.length;
	}

	return state.blocks.future.length > 0;
}

/**
 * Get current edit count
 * @param {object} state - Current state
 * @returns {number}
 */
export function getEditCount( state ) {
	return state.blocks.present.editCount;
}
