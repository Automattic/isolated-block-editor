const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_PEER_SELECTION': {
			if ( ! state[ action.peerId ] ) {
				return state;
			}
			return {
				...state,
				[ action.peerId ]: {
					...state[ action.peerId ],
					...action.selection,
				},
			};
		}

		case 'SET_AVAILABLE_PEERS': {
			return action.peers.reduce( ( acc, { id, name, color, avatarUrl } ) => {
				acc[ id ] = state[ id ] || { name, color, avatarUrl };
				return acc;
			}, {} );
		}
	}

	return state;
};

export default reducer;
