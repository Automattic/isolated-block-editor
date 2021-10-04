const listeners = [];
const disconnectHandlers = [];

/** @return {import("../../src/components/block-editor-contents/use-yjs").CollaborationTransport} */
const mockTransport = ( channelId ) => ( {
	sendMessage: ( data ) => {
		window.localStorage.setItem( `isoEditorYjsMessage-${ channelId }`, JSON.stringify( data ) );
	},
	connect: ( { user: { identity, name, color, avatarUrl }, onReceiveMessage, setAvailablePeers, channelId } ) => {
		listeners.push(
			{
				event: 'storage',
				listener: window.addEventListener( 'storage', ( event ) => {
					window.setTimeout( () => {
						if ( event.storageArea !== localStorage ) return;
						if ( event.key === `isoEditorYjsMessage-${ channelId }` && event.newValue ) {
							onReceiveMessage( JSON.parse( event.newValue ) );
						}
					}, 0 );
				} ),
			},
			{
				event: 'storage',
				listener: window.addEventListener( 'storage', ( event ) => {
					window.setTimeout( () => {
						if ( event.storageArea !== localStorage ) return;
						if ( event.key === `isoEditorYjsPeers-${ channelId }` && event.newValue ) {
							const peersExceptMe = JSON.parse( event.newValue ).filter( ( { id } ) => id !== identity );
							setAvailablePeers( peersExceptMe );
						}
					}, 0 );
				} ),
			}
		);

		const peers = JSON.parse( window.localStorage.getItem( `isoEditorYjsPeers-${ channelId }` ) || '[]' );
		const isFirstInChannel = peers.length === 0;
		setAvailablePeers( peers ); // everyone except me

		window.localStorage.setItem(
			`isoEditorYjsPeers-${ channelId }`,
			JSON.stringify( [ ...peers, { id: identity, name, color, avatarUrl } ] )
		);

		disconnectHandlers.push( () => {
			const peers = JSON.parse( window.localStorage.getItem( `isoEditorYjsPeers-${ channelId }` ) || '[]' );
			window.localStorage.setItem(
				`isoEditorYjsPeers-${ channelId }`,
				JSON.stringify( peers.filter( ( { id } ) => id !== identity ) )
			);
		} );

		return new Promise( ( resolve ) => {
			window.setTimeout( () => {
				resolve( { isFirstInChannel } );
			}, 1000 );
		} );
	},
	disconnect: () => {
		listeners.forEach( ( { event, listener } ) => window.removeEventListener( event, listener ) );
		disconnectHandlers.forEach( ( fn ) => fn() );

		return Promise.resolve();
	},
} );

export const resetPeers = ( channelId ) => {
	window.localStorage.setItem( `isoEditorYjsPeers-${ channelId }`, '' );
};

export const setUpForceRemount = ( forceRemount, channelId ) => {
	listeners.push( {
		event: 'storage',
		listener: window.addEventListener( 'storage', ( event ) => {
			if ( event.storageArea !== localStorage ) return;
			if ( event.key === `isoEditorYjsPeers-${ channelId }` && ! event.newValue ) {
				forceRemount();
			}
		} ),
	} );
};

export default mockTransport;
