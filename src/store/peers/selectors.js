export function getPeers( state ) {
	return state.peers;
}

export function hasPeers( state ) {
	return Object.keys( state.peers ).length > 0;
}
