/**
 * External dependencies
 */
import * as yjs from 'yjs';

/** @typedef {import('./algorithms/yjs').PostObject} PostObject */
/** @typedef {import('..').RichTextHint} RichTextHint */

const encodeArray = ( array ) => array.toString();
const decodeArray = ( string ) => new Uint8Array( string.split( ',' ) );

/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {string} opts.identity - Client identifier.
 * @param {function(yjs.Doc, PostObject, RichTextHint=): void} opts.yDocUpdater - Function to apply changes to the Yjs doc.
 * @param {function(yjs.Doc): PostObject} opts.getPostFromYDoc - Function to get post object data from the Yjs doc.
 * @param {function(any): void} opts.sendMessage
 */
export function createDocument( { identity, yDocUpdater, getPostFromYDoc, sendMessage } ) {
	const doc = new yjs.Doc();
	/** @type {'off'|'connecting'|'on'} */
	let state = 'off';

	let yDocTriggeredChangeListeners = [];
	let connectionReadyListeners = [];

	doc.on( 'update', ( update, origin ) => {
		// Change received from peer, or triggered by self undo/redo
		if ( origin !== identity ) {
			const newData = getPostFromYDoc( doc );
			yDocTriggeredChangeListeners.forEach( ( listener ) => listener( newData ) );
		}

		const isLocalOrigin =
			origin === identity || origin === `no-undo--${ identity }` || origin instanceof yjs.UndoManager;

		// Change should be broadcast to peers
		if ( isLocalOrigin && state === 'on' ) {
			sendMessage( {
				protocol: 'yjs1',
				messageType: 'syncUpdate',
				update: encodeArray( update ),
			} );
		}
	} );

	const setState = ( newState ) => {
		state = newState;

		if ( newState === 'on' ) {
			connectionReadyListeners.forEach( ( listener ) => listener() );
		}
	};

	const sync = ( destination, isReply ) => {
		const stateVector = yjs.encodeStateVector( doc );
		sendMessage( {
			protocol: 'yjs1',
			messageType: 'sync1',
			stateVector: encodeArray( stateVector ),
			origin: identity,
			destination,
			isReply,
		} );
	};

	return {
		/**
		 * @param {PostObject} data
		 * @param {Object} [opts]
		 * @param {boolean} [opts.isInitialContent]
		 * @param {RichTextHint} [opts.richTextHint]
		 */
		applyChangesToYDoc( data, { isInitialContent = false, richTextHint } = {} ) {
			if ( state !== 'on' ) {
				throw 'wrong state';
			}

			const transactionOrigin = isInitialContent ? `no-undo--${ identity }` : identity;

			doc.transact( () => {
				yDocUpdater( doc, data, richTextHint );
			}, transactionOrigin );
		},

		connect() {
			if ( state === 'on' ) {
				throw 'wrong state';
			}

			setState( 'connecting' );
			sync();
		},

		disconnect() {
			setState( 'off' );
		},

		startSharing( data ) {
			if ( state === 'on' ) {
				throw 'wrong state';
			}

			setState( 'on' );

			this.applyChangesToYDoc( data, { isInitialContent: true } );
		},

		receiveMessage( { protocol, messageType, origin, ...content } ) {
			if ( protocol !== 'yjs1' ) {
				throw 'wrong protocol';
			}

			switch ( messageType ) {
				case 'sync1':
					if ( content.destination && content.destination !== identity ) {
						return;
					}
					sendMessage( {
						protocol: 'yjs1',
						messageType: 'sync2',
						update: encodeArray( yjs.encodeStateAsUpdate( doc, decodeArray( content.stateVector ) ) ),
						destination: origin,
					} );
					if ( ! content.isReply ) {
						sync( origin, true );
					}
					break;
				case 'sync2':
					if ( content.destination !== identity ) {
						return;
					}
					yjs.applyUpdate( doc, decodeArray( content.update ), origin );
					setState( 'on' );
					break;
				case 'syncUpdate':
					yjs.applyUpdate( doc, decodeArray( content.update ), origin );
					break;
			}
		},

		onYDocTriggeredChange( listener ) {
			yDocTriggeredChangeListeners.push( listener );

			return () => {
				yDocTriggeredChangeListeners = yDocTriggeredChangeListeners.filter( ( l ) => l !== listener );
			};
		},

		onConnectionReady( listener ) {
			connectionReadyListeners.push( listener );

			return () => {
				connectionReadyListeners = connectionReadyListeners.filter( ( l ) => l !== listener );
			};
		},

		getState() {
			return state;
		},

		getPostMap() {
			return doc.getMap( 'post' );
		},
	};
}
