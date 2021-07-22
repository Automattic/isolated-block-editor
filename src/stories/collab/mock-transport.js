const listeners = [];
const disconnectHandlers = [];

/** @type {import("../../components/block-editor-contents/use-yjs").CollaborationTransport} */
const mockTransport = {
	sendMessage: ( data ) => {
		window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( data ) );
	},
	connect: ( { identity, onReceiveMessage, setAvailablePeers, channelId } ) => {
		listeners.push(
			{
				event: 'storage',
				listener: window.addEventListener( 'storage', ( event ) => {
					if ( event.storageArea !== localStorage ) return;
					if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
						onReceiveMessage( JSON.parse( event.newValue ) );
					}
				} ),
			},
			{
				event: 'storage',
				listener: window.addEventListener( 'storage', ( event ) => {
					if ( event.storageArea !== localStorage ) return;
					if ( event.key === 'isoEditorYjsPeers' && event.newValue ) {
						setAvailablePeers( JSON.parse( event.newValue ) );
					}
				} ),
			}
		);

		const peers = JSON.parse( window.localStorage.getItem( 'isoEditorYjsPeers' ) || '[]' );
		const isFirstInChannel = peers.length === 0;
		setAvailablePeers( peers ); // everyone except me

		window.localStorage.setItem( 'isoEditorYjsPeers', JSON.stringify( [ ...peers, identity ] ) );

		disconnectHandlers.push( () => {
			const peers = JSON.parse( window.localStorage.getItem( 'isoEditorYjsPeers' ) || '[]' );
			window.localStorage.setItem(
				'isoEditorYjsPeers',
				JSON.stringify( peers.filter( ( id ) => id !== identity ) )
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
