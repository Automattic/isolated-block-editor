/**
 * External dependencies
 */
import { createDocument } from 'asblocks/src/lib/yjs-doc';
import { postDocToObject, updatePostDoc } from 'asblocks/src/components/editor/sync/algorithms/yjs';

/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';

let nextDocId = 1;

function initYDoc( blocks, blocksUpdater ) {
	const id = nextDocId++;
	const doc = createDocument( {
		identity: id,
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		sendMessage: ( message ) => window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( message ) ),
	} );

	window.localStorage.setItem(
		'isoEditorClients',
		( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) + 1 ).toString()
	);
	doc.id = id;

	window.addEventListener( 'storage', ( event ) => {
		if ( event.storageArea !== localStorage ) return;
		if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
			doc.receiveMessage( JSON.parse( event.newValue ) );
		}
	} );

	doc.onRemoteDataChange( ( changes ) => {
		console.log( `remotechange received by ${ id }` );
		blocksUpdater( changes.blocks );
	} );

	if ( window.localStorage.getItem( 'isoEditorClients' ) ) {
		doc.startSharing( { title: '', blocks } );
	} else {
		doc.connect();
	}

	return doc;
}

export default function useYjs( { initialBlocks, blockUpdater } ) {
	const ydoc = useRef();
	const applyChangesToYjs = ( blocks ) => ydoc.current?.applyDataChanges?.( { blocks } );

	useEffect( () => {
		ydoc.current = initYDoc( initialBlocks, blockUpdater );
	}, [] );

	return [ applyChangesToYjs ];
}
