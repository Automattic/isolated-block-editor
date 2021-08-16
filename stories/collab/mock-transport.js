const listeners = [];
const disconnectHandlers = [];

/** @type {import("../../src/components/block-editor-contents/use-yjs").CollaborationTransport} */
const mockTransport = {
	sendMessage: ( data ) => {
		window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( data ) );
	},
	connect: ( { user: { identity, name, color }, onReceiveMessage, setAvailablePeers, channelId } ) => {
		listeners.push(
			{
				event: 'storage',
				listener: window.addEventListener( 'storage', ( event ) => {
					window.setTimeout( () => {
						if ( event.storageArea !== localStorage ) return;
						if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
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
						if ( event.key === 'isoEditorYjsPeers' && event.newValue ) {
							const peersExceptMe = JSON.parse( event.newValue ).filter( ( { id } ) => id !== identity );
							setAvailablePeers( peersExceptMe );
						}
					}, 0 );
				} ),
			}
		);

		const peers = JSON.parse( window.localStorage.getItem( 'isoEditorYjsPeers' ) || '[]' );
		const isFirstInChannel = peers.length === 0;
		setAvailablePeers( peers ); // everyone except me

		window.localStorage.setItem(
			'isoEditorYjsPeers',
			JSON.stringify( [ ...peers, { id: identity, name, color } ] )
		);

		disconnectHandlers.push( () => {
			const peers = JSON.parse( window.localStorage.getItem( 'isoEditorYjsPeers' ) || '[]' );
			window.localStorage.setItem(
				'isoEditorYjsPeers',
				JSON.stringify( peers.filter( ( { id } ) => id !== identity ) )
			);
		} );

		return Promise.resolve( { isFirstInChannel } );
	},
	disconnect: () => {
		listeners.forEach( ( { event, listener } ) => window.removeEventListener( event, listener ) );
		disconnectHandlers.forEach( ( fn ) => fn() );

		return Promise.resolve();
	},
};

export default mockTransport;
