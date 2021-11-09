import { createRegistryControl } from '@wordpress/data';

const applyChangesToYDoc = createRegistryControl( ( registry ) => ( action ) => {
	const doc = registry.select( 'isolated/editor' ).getYDoc();

	if ( doc ) {
		doc.applyDataChanges( { blocks: action.blocks } );
	}

	return action;
} );

export const UPDATE_BLOCKS_WITH_UNDO = applyChangesToYDoc;
export const UPDATE_BLOCKS_WITHOUT_UNDO = applyChangesToYDoc;
