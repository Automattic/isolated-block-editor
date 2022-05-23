/**
 * WordPress dependencies
 */
import { createRegistryControl } from '@wordpress/data';
/**
 * External dependencies
 */
import { ActionCreators } from 'redux-undo';

// TODO: Unsolved problem
/**
 * Return the clientId and block attribute key if the current selection can be
 * associated with a RichText attribute.
 *
 * Caution: This won't return false positives, but it will return false negatives.
 * Currently the only way of telling whether a given block attribute is associated with a `<RichText>`
 * in the editor is for it to be passed an `identifier` prop with the block attribute key,
 * e.g. `<RichText identifier="myAttributeKey" />`. If the block developer has neglected to do this,
 * the selection.attributeKey will fall back to a `number`, and we can't tell which attribute it's
 * actually associated with. This happens a lot because the `identifier` prop is undocumented.
 *
 * @param registry
 * @return {import('../../components/collaborative-editing').RichTextHint|undefined}
 */
const getRichTextHint = ( registry ) => {
	const { clientId, attributeKey } = registry.select( 'core/block-editor' ).getSelectionStart();

	// If the selection has an attribute key that is a string, we can deduce that the attribute is a RichText
	return typeof attributeKey === 'string' ? { clientId, attributeKey } : undefined;
};

const applyChangesToYDoc = createRegistryControl( ( registry ) => ( action ) => {
	const doc = registry.select( 'isolated/editor' ).getYDoc();

	// If the change is triggered locally apply those changes to the Yjs doc.
	if ( doc && ! action.isTriggeredByYDoc ) {
		doc.applyLocalChangesToYDoc(
			{ blocks: action.blocks },
			{
				isInitialContent: action.isInitialContent,
				richTextHint: getRichTextHint( registry ),
			}
		);
	}

	return action;
} );

export default {
	UPDATE_BLOCKS_WITH_UNDO: applyChangesToYDoc,
	UPDATE_BLOCKS_WITHOUT_UNDO: applyChangesToYDoc,

	[ ActionCreators.undo().type ]: createRegistryControl( ( registry ) => ( action ) => {
		const pastBlocks = registry.select( 'isolated/editor' ).getPastBlocks();
		const doc = registry.select( 'isolated/editor' ).getYDoc();

		if ( doc && pastBlocks ) {
			doc.applyLocalChangesToYDoc( { blocks: pastBlocks } );
		}

		// Return action so that redux-undo undoes locally.
		return action;
	} ),

	[ ActionCreators.redo().type ]: createRegistryControl( ( registry ) => ( action ) => {
		const futureBlocks = registry.select( 'isolated/editor' ).getFutureBlocks();
		const doc = registry.select( 'isolated/editor' ).getYDoc();

		if ( doc && futureBlocks ) {
			doc.applyLocalChangesToYDoc( { blocks: futureBlocks } );
		}

		// Return action so that redux-undo re-does locally.
		return action;
	} ),
};
