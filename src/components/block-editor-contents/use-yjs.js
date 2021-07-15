/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import { noop } from 'lodash';
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

function initYDoc( { initialBlocks, onRemoteDataChange } ) {
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

	doc.onRemoteDataChange( ( changes ) => {
		console.log( 'remote change received', changes );
		onRemoteDataChange( changes.blocks );
	} );

	return window.fakeTransport.connect().then( ( { isFirstInChannel } ) => {
		if ( isFirstInChannel ) {
			doc.startSharing( { title: '', initialBlocks } );
		} else {
			doc.connect();
		}

		const disconnect = () => {
			window.fakeTransport.disconnect();
			doc.disconnect();
		};

		window.addEventListener( 'beforeunload', () => disconnect() );

		return { doc, disconnect };
	} );
}

export default function useYjs( { initialBlocks, onRemoteDataChange } ) {
	const ydoc = useRef();

	useEffect( () => {
		let onUnmount = noop;

		initYDoc( { initialBlocks, onRemoteDataChange } ).then( ( { doc, disconnect } ) => {
			ydoc.current = doc;
			onUnmount = disconnect;
		} );

		return onUnmount;
	}, [] );

	const applyChangesToYjs = ( blocks ) => ydoc.current?.applyDataChanges?.( { blocks } );

	return [ applyChangesToYjs ];
}
