/**
 * External dependencies
 */
import { ActionCreators, ActionTypes } from 'redux-undo';

const actions = {
	*undo() {
		return yield ActionCreators.undo();
	},
	*redo() {
		return yield ActionCreators.redo();
	},
	clearHisastory() {
		return {
			type: ActionTypes.CLEAR_HISTORY,
		};
	},
	/**
	 * Update blocks without undo history
	 *
	 * @param {object[]} blocks
	 * @param {Object} options
	 */
	*updateBlocksWithUndo( blocks, options = {} ) {
		return yield {
			type: 'UPDATE_BLOCKS_WITH_UNDO',
			blocks,
			...options,
		};
	},
	/**
	 * Update blocks without undo history
	 *
	 * @param {object[]} blocks
	 * @param {Object} options
	 */
	*updateBlocksWithoutUndo( blocks, options = {} ) {
		return yield {
			type: 'UPDATE_BLOCKS_WITHOUT_UNDO',
			blocks,
			...options,
		};
	},
};

export default actions;
