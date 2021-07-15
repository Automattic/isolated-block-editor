/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import { createDocument } from 'asblocks/src/lib/yjs-doc';
import { postDocToObject, updatePostDoc } from 'asblocks/src/components/editor/sync/algorithms/yjs';

/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';

window.fakeTransport = {
	sendMessage: ( message ) => {
		console.log( 'sendMessage', message );
		window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( message ) );
	},
	connect: () => {
		window.localStorage.setItem(
			'isoEditorClients',
			( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) + 1 ).toString()
		);
		const isFirstInChannel = window.localStorage.getItem( 'isoEditorClients' ) === '1';
		return Promise.resolve( { event: 'connected', isFirstInChannel } );
	},
	disconnect: () => {
		return Promise.resolve(
			window.localStorage.setItem(
				'isoEditorClients',
				( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) - 1 ).toString()
			)
		);
	},
};

function initYDoc( blocksUpdater ) {
	const doc = createDocument( {
		identity: uuidv4(),
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		sendMessage: window.fakeTransport.sendMessage,
	} );

	window.addEventListener( 'storage', ( event ) => {
		if ( event.storageArea !== localStorage ) return;
		if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
			doc.receiveMessage( JSON.parse( event.newValue ) );
		}
	} );

	window.addEventListener( 'beforeunload', () => window.fakeTransport.disconnect() );

	doc.onRemoteDataChange( ( changes ) => {
		console.log( 'remote change received', changes );
		blocksUpdater( changes.blocks );
	} );

	return doc;
}

export default function useYjs( { initialBlocks, blockUpdater } ) {
	const ydoc = useRef();
	const applyChangesToYjs = ( blocks ) => ydoc.current?.applyDataChanges?.( { blocks } );

	useEffect( () => {
		window.fakeTransport.connect().then( ( { isFirstInChannel } ) => {
			ydoc.current = initYDoc( blockUpdater );

			if ( isFirstInChannel ) {
				ydoc.current.startSharing( { title: '', initialBlocks } );
			} else {
				ydoc.current.connect();
			}
		} );

		return () => {
			window.fakeTransport.disconnect();
		};
	}, [] );

	return [ applyChangesToYjs ];
}
