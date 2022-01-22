/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import { noop, once, sample } from 'lodash';

/**
 * Internal dependencies
 */
import { createDocument } from './yjs-doc';

/**
 * WordPress dependencies
 */
import { useRegistry, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { addCollabFilters } from './filters';
import { registerCollabFormats } from './formats';
import { setupUndoManager } from './yjs-undo';
import { RelativePosition } from './algorithms/relative-position';

const debug = require( 'debug' )( 'iso-editor:collab' );

/** @typedef {import('..').CollaborationSettings} CollaborationSettings */

export const defaultColors = [ '#4676C0', '#6F6EBE', '#9063B6', '#C3498D', '#9E6D14', '#3B4856', '#4A807A' ];

/**
 * @param {Object} opts
 * @param {import('..').CollaborationSettings} opts.settings
 * @param {Object} opts.registry - Redux data registry for this context.
 */
async function initYDoc( { settings, registry } ) {
	const { channelId, transport } = settings;
	const { dispatch, select } = registry;

	/** @type {string} */
	const identity = uuidv4();

	debug( `initYDoc (identity: ${ identity })` );

	const doc = createDocument( {
		identity,
		relativePositionManager: new RelativePosition( registry ),
		/** @param {Object} message */
		sendMessage: ( message ) => {
			debug( 'sendDocMessage', message );
			transport.sendMessage( { type: 'doc', identity, message } );
		},
	} );

	doc.onConnectionReady(
		once( () => {
			dispatch( 'isolated/editor' ).setYDoc( doc );
			setupUndoManager( doc.getPostMap(), identity, registry );
		} )
	);

	doc.onYDocTriggeredChange( ( changes ) => {
		debug( 'changes triggered by ydoc, applying to editor state', changes );
		dispatch( 'isolated/editor' ).updateBlocksWithUndo( changes.blocks, { isTriggeredByYDoc: true } );
	} );

	const { isFirstInChannel } = await transport.connect( {
		user: {
			identity,
			name: settings.username,
			color: settings.caretColor || sample( defaultColors ),
			avatarUrl: settings.avatarUrl,
		},
		/** @param {import('..').CollaborationTransportMessage} data */
		onReceiveMessage: ( data ) => {
			debug( 'remote change received by transport', data );

			switch ( data.type ) {
				case 'doc': {
					doc.receiveMessage( data.message );
					break;
				}
				case 'selection': {
					dispatch( 'isolated/editor' ).setCollabPeerSelection( data.identity, data.selection );
					break;
				}
			}
		},
		setAvailablePeers: ( peers ) => {
			debug( 'setAvailablePeers', peers );
			dispatch( 'isolated/editor' ).setAvailableCollabPeers( peers );
		},
		channelId,
	} );

	debug( `connected (channelId: ${ channelId })` );

	if ( isFirstInChannel ) {
		debug( 'first in channel' );

		// Fetching the blocks from redux now, after the transport has successfully connected,
		// ensures that we don't initialize the Yjs doc with stale blocks.
		// (This can happen if <IsolatedBlockEditor> is given an onLoad handler.)
		doc.startSharing( { title: '', blocks: select( 'core/block-editor' ).getBlocks() } );
	} else {
		doc.connect();
	}

	const disconnect = () => {
		transport.disconnect();
		doc.disconnect();
	};

	window.addEventListener( 'beforeunload', () => disconnect() );

	return {
		sendSelection: ( start, end ) => {
			debug( 'sendSelection', start, end );
			transport.sendMessage( {
				type: 'selection',
				identity,
				selection: {
					start,
					end,
				},
			} );
		},
		disconnect: () => {
			window.removeEventListener( 'beforeunload', disconnect );
			disconnect();
		},
	};
}

/**
 * @param {Object} opts - Hook options
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs( { settings } ) {
	const onSelectionChange = useRef( noop );
	const registry = useRegistry();

	const { getFormatType, selectionStart, selectionEnd } = useSelect( ( select ) => {
		return {
			getFormatType: select( 'core/rich-text' ).getFormatType,
			selectionStart: select( 'core/block-editor' ).getSelectionStart(),
			selectionEnd: select( 'core/block-editor' ).getSelectionEnd(),
		};
	}, [] );

	useEffect( () => {
		if ( ! settings?.enabled ) {
			return;
		}

		if ( ! settings.transport ) {
			// eslint-disable-next-line no-console
			console.error( `Collaborative editor is disabled because a transport module wasn't provided.` );
			return;
		}

		debug( 'registered collab formats' );
		registerCollabFormats( getFormatType );

		debug( 'added collab filters' );
		addCollabFilters();

		let onUnmount = noop;

		initYDoc( {
			settings,
			registry,
		} ).then( ( { sendSelection, disconnect } ) => {
			onUnmount = () => {
				debug( 'unmount' );
				disconnect();
			};

			onSelectionChange.current = sendSelection;
		} );

		return () => onUnmount();
	}, [] );

	useEffect( () => {
		onSelectionChange.current( selectionStart, selectionEnd );
	}, [ selectionStart, selectionEnd ] );
}
