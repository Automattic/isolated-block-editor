const listeners = [];

/** @type {import("../../components/block-editor-contents/use-yjs").CollaborationTransport} */
const mockTransport = {
	sendMessage: ( message ) => {
		window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( message ) );
	},
	connect: ( { channelId, onReceiveMessage } ) => {
		listeners.push( {
			event: 'storage',
			listener: window.addEventListener( 'storage', ( event ) => {
				if ( event.storageArea !== localStorage ) return;
				if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
					onReceiveMessage( JSON.parse( event.newValue ) );
				}
			} ),
		} );

		window.localStorage.setItem(
			'isoEditorClients',
			( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) + 1 ).toString()
		);
		const isFirstInChannel = window.localStorage.getItem( 'isoEditorClients' ) === '1';
		return Promise.resolve( { isFirstInChannel } );
	},
	disconnect: () => {
		listeners.forEach( ( { event, listener } ) => window.removeEventListener( event, listener ) );

		const clientCount = Math.max( 0, parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) - 1 );
		return Promise.resolve( window.localStorage.setItem( 'isoEditorClients', clientCount.toString() ) );
	},
};

export default mockTransport;
