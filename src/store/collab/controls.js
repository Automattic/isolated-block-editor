/**
 * External dependencies
 */
import { ActionCreators } from 'redux-undo';

/**
 * WordPress dependencies
 */
import { createRegistryControl } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { RelativePosition } from '../../components/collaborative-editing/use-yjs/algorithms/relative-position';

const debugUndo = require( 'debug' )( 'iso-editor:collab:undo' );

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
 * @returns {import('../../components/collaborative-editing').RichTextHint|undefined}
 */
const getRichTextHint = ( registry ) => {
	const { clientId, attributeKey } = registry.select( 'core/block-editor' ).getSelectionStart();

	// If the selection has an attribute key that is a string, we can deduce that the attribute is a RichText
	return typeof attributeKey === 'string' ? { clientId, attributeKey } : undefined;
};

const initRelativePositionForPeer = ( peer, registry ) =>
	new RelativePosition(
		() => ( { start: peer.start ?? {}, end: peer.end ?? {} } ),
		( clientId, attributeKey, startOffset, endOffset ) =>
			registry.dispatch( 'isolated/editor' ).setCollabPeerSelection( peer.id, {
				start: { clientId, attributeKey, offset: startOffset },
				end: { clientId, attributeKey, offset: endOffset },
			} )
	);

const applyChangesToYDoc = createRegistryControl( ( registry ) => ( action ) => {
	const doc = registry.select( 'isolated/editor' ).getYDoc();

	if ( doc && ! action.isTriggeredByYDoc ) {
		const peerRelativePositions = Object.values(
			registry.select( 'isolated/editor' ).getCollabPeers()
		).map( ( peer ) => initRelativePositionForPeer( peer, registry ) );
		peerRelativePositions.forEach( ( relPos ) => relPos.saveRelativePosition( doc.getDoc() ) );

		doc.applyLocalChangesToYDoc(
			{ blocks: action.blocks },
			{
				isInitialContent: action.isInitialContent,
				richTextHint: getRichTextHint( registry ),
			}
		);

		peerRelativePositions.forEach( ( relPos ) => relPos.setAbsolutePosition( doc.getDoc() ) );
	}

	return action;
} );

export default {
	UPDATE_BLOCKS_WITH_UNDO: applyChangesToYDoc,
	UPDATE_BLOCKS_WITHOUT_UNDO: applyChangesToYDoc,

	[ ActionCreators.undo().type ]: createRegistryControl( ( registry ) => ( action ) => {
		const undoManager = registry.select( 'isolated/editor' ).getUndoManager();

		if ( ! undoManager ) {
			return action;
		}

		debugUndo( 'undo' );
		undoManager.undo();
		return; // prevent default action
	} ),

	[ ActionCreators.redo().type ]: createRegistryControl( ( registry ) => ( action ) => {
		const undoManager = registry.select( 'isolated/editor' ).getUndoManager();

		if ( ! undoManager ) {
			return action;
		}

		debugUndo( 'redo' );
		registry.select( 'isolated/editor' ).getUndoManager().redo();
		return; // prevent default action
	} ),
};
