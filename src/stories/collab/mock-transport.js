const mockTransport = {
	sendMessage: ( message ) => {
		window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( message ) );
	},
	connect: ( channelId ) => {
		window.localStorage.setItem(
			'isoEditorClients',
			( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) + 1 ).toString()
		);
		const isFirstInChannel = window.localStorage.getItem( 'isoEditorClients' ) === '1';
		return Promise.resolve( { isFirstInChannel } );
	},
	disconnect: () => {
		const clientCount = Math.max( 0, parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) - 1 );
		return Promise.resolve( window.localStorage.setItem( 'isoEditorClients', clientCount.toString() ) );
	},
};

export default mockTransport;
