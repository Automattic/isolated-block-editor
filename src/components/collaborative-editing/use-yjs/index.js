/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import { noop, sample } from 'lodash';
import { createDocument } from './yjs-doc';
import { postDocToObject, updatePostDoc } from './algorithms/yjs';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { addCollabFilters } from './filters';
import { registerCollabFormats } from './formats';

const debug = require( 'debug' )( 'iso-editor:collab' );

/** @typedef {import('..').CollaborationSettings} CollaborationSettings */
/** @typedef {import('..').CollaborationTransport} CollaborationTransport */
/** @typedef {import('..').CollaborationTransportDocMessage} CollaborationTransportDocMessage */
/** @typedef {import('..').CollaborationTransportSelectionMessage} CollaborationTransportSelectionMessage */
/** @typedef {import('..').EditorSelection} EditorSelection */
/** @typedef {import('../../block-editor-contents').OnUpdate} OnUpdate */

export const defaultColors = [ '#4676C0', '#6F6EBE', '#9063B6', '#C3498D', '#9E6D14', '#3B4856', '#4A807A' ];

/**
 * @param {object} opts - Hook options
 * @param {() => object[]} opts.getBlocks - Content to initialize the Yjs doc with.
 * @param {OnUpdate} opts.onRemoteDataChange - Function to update editor blocks in redux state.
 * @param {CollaborationSettings} opts.settings
 * @param {import('../../../store/peers/actions').setAvailablePeers} opts.setAvailablePeers
 * @param {import('../../../store/peers/actions').setPeerSelection} opts.setPeerSelection
 *
 * @typedef IsoEditorSelection
 * @property {object} selectionStart
 * @property {object} selectionEnd
 */
async function initYDoc( { getBlocks, onRemoteDataChange, settings, setPeerSelection, setAvailablePeers } ) {
	const { channelId, transport } = settings;

	/** @type string */
	const identity = uuidv4();

	debug( `initYDoc (identity: ${ identity })` );

	const doc = createDocument( {
		identity,
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		/** @param {object} message */
		sendMessage: ( message ) => {
			debug( 'sendDocMessage', message );
			transport.sendMessage( { type: 'doc', identity, message } );
		},
	} );

	/** @param {CollaborationTransportDocMessage|CollaborationTransportSelectionMessage} data */
	const onReceiveMessage = ( data ) => {
		debug( 'remote change received by transport', data );

		switch ( data.type ) {
			case 'doc': {
				doc.receiveMessage( data.message );
				break;
			}
			case 'selection': {
				setPeerSelection( data.identity, data.selection );
				break;
			}
		}
	};

	doc.onRemoteDataChange( ( changes ) => {
		debug( 'remote change received by ydoc', changes );
		onRemoteDataChange( changes.blocks );
	} );

	return transport
		.connect( {
			user: {
				identity,
				name: settings.username,
				color: settings.caretColor || sample( defaultColors ),
				avatarUrl: settings.avatarUrl,
			},
			onReceiveMessage,
			setAvailablePeers: ( peers ) => {
				debug( 'setAvailablePeers', peers );
				setAvailablePeers( peers );
			},
			channelId,
		} )
		.then( ( { isFirstInChannel } ) => {
			debug( `connected (channelId: ${ channelId })` );

			if ( isFirstInChannel ) {
				debug( 'first in channel' );

				// Fetching the blocks from redux now, after the transport has successfully connected,
				// ensures that we don't initialize the Yjs doc with stale blocks.
				// (This can happen if <IsolatedBlockEditor> is given an onLoad handler.)
				doc.startSharing( { title: '', blocks: getBlocks() } );
			} else {
				doc.connect();
			}

			const onSelectionChange = ( start, end ) => {
				debug( 'sendSelection', start, end );
				transport.sendMessage( {
					type: 'selection',
					identity,
					selection: {
						start,
						end,
					},
				} );
			};

			const disconnect = () => {
				transport.disconnect();
				doc.disconnect();
			};

			window.addEventListener( 'beforeunload', () => disconnect() );

			return { doc, onSelectionChange, disconnect };
		} );
}

/**
 * @param {object} opts - Hook options
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs( { settings } ) {
	const applyChangesToYjs = useRef( noop );
	const sendSelection = useRef( noop );

	const { blocks, getBlocks, selectionStart, selectionEnd } = useSelect( ( select ) => {
		return {
			blocks: select( 'isolated/editor' ).getBlocks(),
			getBlocks: select( 'isolated/editor' ).getBlocks,
			selectionStart: select( 'core/block-editor' ).getSelectionStart(),
			selectionEnd: select( 'core/block-editor' ).getSelectionEnd(),
		};
	}, [] );

	const { setAvailablePeers, setPeerSelection, updateBlocksWithUndo } = useDispatch( 'isolated/editor' );

	useEffect( () => {
		if ( ! settings?.enabled ) {
			return;
		}

		if ( ! settings.transport ) {
			console.error( `Collaborative editor is disabled because a transport module wasn't provided.` );
			return;
		}

		debug( 'registered collab formats' );
		registerCollabFormats();

		debug( 'added collab filters' );
		addCollabFilters();

		let onUnmount = noop;

		initYDoc( {
			onRemoteDataChange: updateBlocksWithUndo,
			settings,
			getBlocks,
			setPeerSelection,
			setAvailablePeers,
		} ).then( ( { doc, onSelectionChange, disconnect } ) => {
			onUnmount = () => {
				debug( 'unmount' );
				disconnect();
			};

			applyChangesToYjs.current = ( blocks ) => {
				if ( doc.getState() !== 'on' ) {
					return;
				}
				debug( 'local changes applied to ydoc' );
				doc.applyDataChanges( { blocks } );
			};

			sendSelection.current = onSelectionChange;
		} );

		return () => onUnmount();
	}, [] );

	useEffect( () => {
		applyChangesToYjs.current( blocks );
	}, [ blocks ] );

	useEffect( () => {
		sendSelection.current( selectionStart, selectionEnd );
	}, [ selectionStart, selectionEnd ] );
}
