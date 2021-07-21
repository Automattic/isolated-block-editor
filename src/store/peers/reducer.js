const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_PEER_SELECTION':
			if ( ! state[ action.peer ] ) {
				return state;
			}
			return { ...state, [ action.peer ]: action.selection };
		case 'SET_AVAILABLE_PEERS':
			return action.peers.reduce( ( acc, peer ) => {
				acc[ peer ] = state[ peer ] || {};
				return acc;
			}, {} );
	}

	return state;
};

export default reducer;
