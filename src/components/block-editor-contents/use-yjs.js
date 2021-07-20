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
/** @typedef {import('../..').CollaborationTransport} CollaborationTransport */
/** @typedef {import('.').OnUpdate} OnUpdate */

/**
 * @param {object} opts - Hook options
 * @param {object[]} opts.initialBlocks
 * @param {OnUpdate} opts.onRemoteDataChange
 * @param {string} [opts.channelId]
 * @param {CollaborationTransport} opts.transport
 */
function initYDoc( { initialBlocks, onRemoteDataChange, channelId, transport } ) {
	debug( 'initYDoc' );

	const doc = createDocument( {
		identity: uuidv4(),
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		sendMessage: ( message ) => {
			debug( 'sendMessage', message );
			transport.sendMessage( message );
		},
	} );

	doc.onRemoteDataChange( ( changes ) => {
		debug( 'remote change received', changes );
		onRemoteDataChange( changes.blocks );
	} );

	return transport.connect( { channelId, onReceiveMessage: doc.receiveMessage } ).then( ( { isFirstInChannel } ) => {
		debug( `connected (channelId: ${ channelId })` );

		if ( isFirstInChannel ) {
			debug( 'first in channel' );
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

		if ( ! settings.transport ) {
			console.error( `Collaborative editor is disabled because a transport module wasn't provided.` );
			return;
		}

		let onUnmount = noop;

		initYDoc( {
			initialBlocks,
			onRemoteDataChange,
			channelId: settings.channelId,
			transport: settings.transport,
		} ).then( ( { doc, disconnect } ) => {
			ydoc.current = doc;
			onUnmount = () => {
				debug( 'unmount' );
				disconnect();
			};
		} );

		return () => onUnmount();
	}, [] );

	// noop when collab is disabled (i.e. ydoc isn't initialized)
	// @ts-ignore: Don't know how to fix :(
	const applyChangesToYjs = ( blocks ) => ydoc.current?.applyDataChanges?.( { blocks } );

	return [ applyChangesToYjs ];
}
