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

const debug = require( 'debug' )( 'iso-editor:collab' );

/** @typedef {import('../..').CollaborationSettings} CollaborationSettings */
/** @typedef {import('.').OnUpdate} OnUpdate */

/**
 * @param {object} opts - Hook options
 * @param {object[]} opts.initialBlocks
 * @param {OnUpdate} opts.onRemoteDataChange
 * @param {string} [opts.channelId]
 */
function initYDoc( { initialBlocks, onRemoteDataChange, channelId, transport } ) {
	debug( 'initYDoc' );

	const doc = createDocument( {
		identity: uuidv4(),
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		sendMessage: ( ...args ) => {
			debug( 'sendMessage', ...args );
			transport.sendMessage( ...args );
		},
	} );

	window.addEventListener( 'storage', ( event ) => {
		if ( event.storageArea !== localStorage ) return;
		if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
			doc.receiveMessage( JSON.parse( event.newValue ) );
		}
	} );

	doc.onRemoteDataChange( ( changes ) => {
		debug( 'remote change received', changes );
		onRemoteDataChange( changes.blocks );
	} );

	return transport.connect( channelId ).then( ( { isFirstInChannel } ) => {
		debug( `connected (channelId: ${ channelId })` );

		if ( isFirstInChannel ) {
			doc.startSharing( { title: '', initialBlocks } );
		} else {
			doc.connect();
		}

		const disconnect = () => {
			transport.disconnect();
			doc.disconnect();
		};

		window.addEventListener( 'beforeunload', () => disconnect() );

		return { doc, disconnect };
	} );
}

/**
 * @param {object} opts - Hook options
 * @param {object[]} opts.initialBlocks
 * @param {OnUpdate} opts.onRemoteDataChange
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs( { initialBlocks, onRemoteDataChange, settings } ) {
	const ydoc = useRef();

	useEffect( () => {
		if ( ! settings?.enabled ) {
			return;
		}

		let onUnmount = noop;

		initYDoc( {
			initialBlocks,
			onRemoteDataChange,
			channelId: settings?.channelId,
			transport: settings?.transport,
		} ).then( ( { doc, disconnect } ) => {
			ydoc.current = doc;
			onUnmount = () => {
				debug( 'unmount' );
				disconnect();
			};
		} );

		return () => onUnmount();
	}, [] );

	const applyChangesToYjs = ( blocks ) => ydoc.current?.applyDataChanges?.( { blocks } );

	return [ applyChangesToYjs ];
}
