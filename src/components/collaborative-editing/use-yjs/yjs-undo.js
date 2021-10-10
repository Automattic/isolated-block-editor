/**
 * External dependencies
 */
import * as yjs from 'yjs';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

const debugUndo = require( 'debug' )( 'iso-editor:collab:undo' );

/**
 * Set up undo handling.
 *
 * @param {yjs.AbstractType} typeScope - Yjs type to initialize the undo manager with.
 * @param {string} identity
 * @param {Object} registry - Registry object from `@wordpress/data`.
 */
export function setupUndoManager( typeScope, identity, registry ) {
	const { dispatch, select } = registry;

	const getSelection = () => ( {
		start: select( 'core/block-editor' ).getSelectionStart(),
		end: select( 'core/block-editor' ).getSelectionEnd(),
	} );
	const setSelection = ( { start, end } ) =>
		dispatch( 'core/block-editor' ).selectionChange(
			start?.clientId,
			start?.attributeKey,
			start?.offset,
			end?.offset
		);

	const undoManager = new yjs.UndoManager( typeScope, { trackedOrigins: new Set( [ identity ] ) } );

	undoManager.on( 'stack-item-added', ( event ) => {
		const selection = getSelection();
		event.stackItem.meta.set( 'caret-location', selection );
		debugUndo( 'undo stack item added with selection', selection );
	} );
	undoManager.on( 'stack-item-popped', ( event ) => {
		const selectionReferenceItem = event.type === 'undo' ? undoManager?.undoStack.at( -1 ) : event.stackItem;
		const selection = selectionReferenceItem?.meta.get( 'caret-location' );
		if ( selection?.start ) {
			setSelection( selection );
		}
		debugUndo( 'stack item popped with selection', selection );
	} );

	debugUndo( 'instantiated UndoManager' );

	addFilter( 'isoEditor.blockEditor.undo', 'isolated-block-editor/collab', () => () => {
		debugUndo( 'undo' );
		undoManager.undo();
	} );
	addFilter( 'isoEditor.blockEditor.redo', 'isolated-block-editor/collab', () => () => {
		debugUndo( 'redo' );
		undoManager.redo();
	} );
	addFilter(
		'isoEditor.blockEditor.hasEditorUndo',
		'isolated-block-editor/collab',
		() => ( undoManager.undoStack.length ?? 0 ) > 1
	);
	addFilter(
		'isoEditor.blockEditor.hasEditorRedo',
		'isolated-block-editor/collab',
		() => !! undoManager.redoStack.length
	);
}
