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
import { useDispatch, useSelect, useRegistry } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { addCollabFilters } from './filters';
import { registerCollabFormats } from './formats';
import { calculateNewPosition } from './algorithms/relative-position';

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

			const applyChangesToYjs = ( blocks ) => {
				if ( doc.getState() !== 'on' ) {
					return;
				}
				debug( 'local changes applied to ydoc' );
				doc.applyDataChanges( { blocks } );
			};

			const sendSelection = ( start, end ) => {
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

			return { applyChangesToYjs, sendSelection, disconnect };
		} );
}

/**
 * @param {object} opts - Hook options
 * @param {CollaborationSettings} [opts.settings]
 */
export default function useYjs( { settings } ) {
	const onBlocksChange = useRef( noop );
	const onSelectionChange = useRef( noop );

	const { blocks, getBlocks, getBlock, getSelection, selectionStart, selectionEnd } = useSelect( ( select ) => {
		return {
			blocks: select( 'isolated/editor' ).getBlocks(),
			getBlocks: select( 'isolated/editor' ).getBlocks,
			getBlock: select( 'core/block-editor' ).getBlock,
			getSelection: () => ( {
				start: select( 'core/block-editor' ).getSelectionStart(),
				end: select( 'core/block-editor' ).getSelectionEnd(),
			} ),
			selectionStart: select( 'core/block-editor' ).getSelectionStart(),
			selectionEnd: select( 'core/block-editor' ).getSelectionEnd(),
		};
	} );

	const { setAvailablePeers, setPeerSelection, updateBlocksWithUndo } = useDispatch( 'isolated/editor' );
	const { selectionChange } = useDispatch( 'core/block-editor' );

	const registry = useRegistry();

	const onRemoteDataChange = ( blocks ) => {
		const { start, end } = getSelection();

		// Note that the attribute key from a WPBlockSelection (start.attributeKey) does not necessarily
		// match an actual attribute key on the block. This can happen when the `identifier` prop is
		// not specified on the RichText component.
		const oldText = start?.attributeKey ? getBlock( start.clientId ).attributes[ start.attributeKey ] : undefined;

		// We can't use the standard getBlock() selector here because we want to locate
		// a block inside the new blocks array we just received (before committing it to redux state).
		const findBlockByClientId = ( blocks, clientId ) => {
			return blocks.reduce( ( acc, block ) => {
				if ( acc ) return acc;
				return block.clientId === clientId ? block : findBlockByClientId( block.innerBlocks, clientId );
			}, undefined );
		};

		const isInnerBlock = ( blocks, clientId ) => {
			return ! blocks.find( ( block ) => block.clientId === clientId );
		};

		const updateBlocksAndMaybeShiftCaret = () => {
			updateBlocksWithUndo( blocks );

			if ( oldText === undefined ) return;

			const selectedBlockInUpdatedBlocks = findBlockByClientId( blocks, start.clientId );

			// If possible, try to intelligently infer my new caret position after it might have been
			// affected by an incoming peer edit.
			if ( selectedBlockInUpdatedBlocks ) {
				const newText = selectedBlockInUpdatedBlocks.attributes[ start.attributeKey ];
				const newStartOffset = calculateNewPosition( oldText, newText, start.offset );
				const newEndOffset =
					end.offset !== start.offset ? calculateNewPosition( oldText, newText, end.offset ) : newStartOffset;

				if ( start.offset !== newStartOffset || end.offset !== newEndOffset ) {
					debug(
						`smart shifted caret position from ${ start.offset },${ end.offset } to ${ newStartOffset },${ newEndOffset }`
					);
					selectionChange( start.clientId, start.attributeKey, newStartOffset, newEndOffset );
				}
			}
		};

		// Batching ensures that the blocks update and the possible caret shift will be in the same render.
		// Ideally we want to batch in both cases, but when the selected block is nested inside another
		// block, there is a bug that completely resets the selection after our intended selectionChange().
		// TODO: Fix the bug! (Maybe related: https://github.com/Automattic/isolated-block-editor/issues/60)
		if ( isInnerBlock( blocks, start.clientId ) ) {
			updateBlocksAndMaybeShiftCaret();
		} else {
			registry.batch( updateBlocksAndMaybeShiftCaret );
		}
	};

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
			onRemoteDataChange,
			settings,
			getBlocks,
			setPeerSelection,
			setAvailablePeers,
		} ).then( ( { applyChangesToYjs, sendSelection, disconnect } ) => {
			onUnmount = () => {
				debug( 'unmount' );
				disconnect();
			};

			onBlocksChange.current = applyChangesToYjs;
			onSelectionChange.current = sendSelection;
		} );

		return () => onUnmount();
	}, [] );

	useEffect( () => {
		onBlocksChange.current( blocks );
	}, [ blocks ] );

	useEffect( () => {
		onSelectionChange.current( selectionStart, selectionEnd );
	}, [ selectionStart, selectionEnd ] );
}
