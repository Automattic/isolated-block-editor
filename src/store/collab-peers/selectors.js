export function getCollabPeers( state ) {
	return state.collabPeers;
}

export function hasCollabPeers( state ) {
	return Object.keys( state.collabPeers ).length > 0;
}
