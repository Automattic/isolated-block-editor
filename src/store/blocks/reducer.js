/**
 * External dependencies
 */
import undoable, { includeAction } from 'redux-undo';

const DEFAULT_STATE = {
	editCount: 0,
	selection: null,
	blocks: null,
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	// console.log( 'DEBUG', action );
	switch ( action.type ) {
		case 'UPDATE_BLOCKS_WITHOUT_UNDO':
			return {
				...state,
				blocks: action.blocks,
				selection: action.selection,
			};

		case 'UPDATE_BLOCKS_WITH_UNDO':
			return {
				...state,
				blocks: action.blocks,
				selection: action.selection,
				editCount: state.editCount + 1,
			};
	}

	return state;
};

export default undoable( reducer, {
	ignoreInitialState: true,
	filter: includeAction( 'UPDATE_BLOCKS_WITH_UNDO' ),
} );
