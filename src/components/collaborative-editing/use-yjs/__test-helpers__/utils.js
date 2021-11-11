/**
 * Helper to generate mock transport modules for an isolated channel.
 *
 * @param {number} count - Number of transport modules to generate.
 * @return {Object[]} - Array of transport modules.
 */
export function getTransports( count ) {
	const peers = {};

	const getAvailablePeers = ( excludeId ) =>
		Object.values( peers ).reduce( ( acc, p ) => {
			if ( p.user.id === excludeId ) return acc;
			return [ ...acc, p.user ];
		}, [] );

	const mockTransport = () => {
		const transport = {
			_identity: undefined,
			connect: jest.fn( ( { onReceiveMessage, setAvailablePeers, user } ) => {
				transport._identity = user.identity;
				peers[ user.identity ] = { onReceiveMessage, setAvailablePeers, user: { ...user, id: user.identity } };
				Object.keys( peers ).forEach( ( identity ) => {
					peers[ identity ].setAvailablePeers( getAvailablePeers( identity ) );
				} );
				return Promise.resolve( { isFirstInChannel: Object.keys( peers ).length === 1 } );
			} ),
			sendMessage: jest.fn( ( data ) => {
				// console.log( data.message.messageType, data.identity.substring( 0, 4 ) );
				Object.keys( peers ).forEach( ( identity ) => {
					if ( identity !== data.identity ) {
						peers[ identity ].onReceiveMessage( data );
					}
				} );
			} ),
			disconnect: jest.fn( () => {
				delete peers[ transport._identity ];
				Object.keys( peers ).forEach( ( identity ) => {
					peers[ identity ].setAvailablePeers( getAvailablePeers( identity ) );
				} );
			} ),
		};

		return transport;
	};

	return Array( count )
		.fill( null )
		.map( () => mockTransport() );
}
