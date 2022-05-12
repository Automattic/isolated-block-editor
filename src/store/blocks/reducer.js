/**
 * External dependencies
 */
import undoable from 'redux-undo';

/**
 * WordPress dependencies
 */
import isShallowEqual from '@wordpress/is-shallow-equal';

const DEFAULT_STATE = {
	editCount: 0,
	selection: null,
	blocks: null,
};

const groupBy = ( action, currentState, previousHistory ) => {
	return currentState.editCount;
};

function getSelectedBlock( blocks, selection ) {
	return blocks.find( ( block ) => block.clientId === selection.clientId );
}

// Gutenberg triggers a UPDATE_BLOCKS_WITH_UNDO one second after typing. Try and group this with the previous edits
function isNewUndo( action, state ) {
	const { type, selection } = action;

	// Don't create a new undo when flagged as no undo
	if ( type === 'UPDATE_BLOCKS_WITHOUT_UNDO' ) {
		return false;
	}

	if ( ! selection ) {
		return true;
	}

	// Not new if selection is same
	if ( isShallowEqual( selection, state.selection ) ) {
		const previousBlock = getSelectedBlock( state.blocks, selection.selectionStart );
		const currentBlock = getSelectedBlock( action.blocks, selection.selectionStart );

		// Check if any attributes have changed in the selected block
		if ( previousBlock && currentBlock && isShallowEqual( previousBlock.attributes, currentBlock.attributes ) ) {
			// Nothing has changed - not a new undo level
			return false;
		}
	}

	// Yes, a new undo level
	return true;
}

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'UPDATE_BLOCKS_WITHOUT_UNDO':
		case 'UPDATE_BLOCKS_WITH_UNDO':
			return {
				...state,
				editCount: isNewUndo( action, state ) ? state.editCount + 1 : state.editCount,
				blocks: action.blocks,
				selection: action.selection,
			};
	}

	return state;
};

export default undoable( reducer, {
	groupBy,
} );
