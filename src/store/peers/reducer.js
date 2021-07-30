const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'SET_PEER_SELECTION': {
			if ( ! state[ action.peer ] ) {
				return state;
			}
			return {
				...state,
				[ action.peer ]: {
					...state[ action.peer ],
					...action.selection,
					color: action.color,
				},
			};
		}

		case 'SET_AVAILABLE_PEERS': {
			return action.peers.reduce( ( acc, { id, name } ) => {
				acc[ id ] = state[ id ] || { name };
				return acc;
			}, {} );
		}
	}

	return state;
};

export default reducer;
