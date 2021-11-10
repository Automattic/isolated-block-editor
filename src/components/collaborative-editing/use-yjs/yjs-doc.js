/**
 * External dependencies
 */
import * as yjs from 'yjs';

/** @typedef {import('./algorithms/yjs').PostObject} PostObject */

const encodeArray = ( array ) => array.toString();
const decodeArray = ( string ) => new Uint8Array( string.split( ',' ) );

/**
 * Create a Yjs document.
 *
 * @param {Object} opts
 * @param {string} opts.identity - Client identifier.
 * @param {function(yjs.Doc, PostObject): void} opts.applyDataChanges - Function to apply changes to the Yjs doc.
 * @param {function(yjs.Doc): PostObject} opts.getData - Function to get post object data from the Yjs doc.
 * @param {function(any): void} opts.sendMessage
 */
export function createDocument( { identity, applyDataChanges, getData, sendMessage } ) {
	const doc = new yjs.Doc();
	let state = 'off';

	let remoteChangeListeners = [];
	let stateListeners = [];
	let undoRedoListeners = [];

	doc.on( 'update', ( update, origin ) => {
		const isRemoteOrigin = origin !== identity && ! ( origin instanceof yjs.UndoManager );

		if ( isRemoteOrigin ) {
			const newData = getData( doc );
			remoteChangeListeners.forEach( ( listener ) => listener( newData ) );
			return;
		}

		if ( origin instanceof yjs.UndoManager ) {
			const newData = getData( doc );
			undoRedoListeners.forEach( ( listener ) => listener( newData ) );
		}

		if ( ! isRemoteOrigin && state === 'on' ) {
			sendMessage( {
				protocol: 'yjs1',
				messageType: 'syncUpdate',
				update: encodeArray( update ),
			} );
		}
	} );

	const setState = ( newState ) => {
		state = newState;
		stateListeners.forEach( ( listener ) => listener( newState ) );
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
		applyDataChanges( data ) {
			if ( state !== 'on' ) {
				throw 'wrong state';
			}
			doc.transact( () => {
				applyDataChanges( doc, data );
			}, identity );
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
			this.applyDataChanges( data );
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

		onRemoteDataChange( listener ) {
			remoteChangeListeners.push( listener );

			return () => {
				remoteChangeListeners = remoteChangeListeners.filter( ( l ) => l !== listener );
			};
		},

		onStateChange( listener ) {
			stateListeners.push( listener );

			return () => {
				stateListeners = stateListeners.filter( ( l ) => l !== listener );
			};
		},

		onUndoRedo( listener ) {
			undoRedoListeners.push( listener );

			return () => {
				undoRedoListeners = undoRedoListeners.filter( ( l ) => l !== listener );
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
