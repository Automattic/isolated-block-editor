/**
 * External dependencies
 */
import undoable from 'redux-undo';

const DEFAULT_STATE = {
	editCount: 0,
	selection: null,
	blocks: null,
};

let initialized = false;

const filter = ( action ) => {
	if ( action.type === 'UPDATE_BLOCKS_WITHOUT_UNDO' && ! initialized ) {
		initialized = true;
		return true;
	}

	return action.type === 'UPDATE_BLOCKS_WITH_UNDO';
};

const reducer = ( state = DEFAULT_STATE, action ) => {
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
	filter,
} );
