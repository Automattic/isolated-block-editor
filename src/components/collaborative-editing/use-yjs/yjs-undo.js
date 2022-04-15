/**
 * External dependencies
 */
import * as yjs from 'yjs';

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

	const debugUndoWithStackSizes = ( ...args ) => {
		debugUndo( ...args );
		debugUndo( `stack size: undo ${ undoManager.undoStack.length }, redo ${ undoManager.redoStack.length }` );
	};

	undoManager.on( 'stack-item-added', ( event ) => {
		const selection = getSelection();
		event.stackItem.meta.set( 'caret-location', selection );
		debugUndoWithStackSizes( `${ event.type } stack item added with selection`, selection );
	} );

	undoManager.on( 'stack-item-popped', ( event ) => {
		if ( event.type === 'undo' && undoManager.undoStack.length === 0 ) {
			debugUndoWithStackSizes( `undo stack item popped (last item, no caret position to restore)` );
			return;
		}

		const selection = event.stackItem.meta.get( 'caret-location' );

		if ( selection?.start ) {
			setSelection( selection );
			debugUndoWithStackSizes( `${ event.type } stack item popped with selection`, selection );
			return;
		}

		debugUndoWithStackSizes( `${ event.type } stack item popped without selection` );
	} );

	dispatch( 'isolated/editor' ).setUndoManager( undoManager );

	debugUndo( 'instantiated UndoManager' );
}
