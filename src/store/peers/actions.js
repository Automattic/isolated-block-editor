function setAvailablePeers( peers ) {
	return {
		type: 'SET_AVAILABLE_PEERS',
		peers,
	};
}

function setPeerSelection( peer, selection ) {
	return {
		type: 'SET_PEER_SELECTION',
		peer,
		selection,
	};
}

export default {
	setAvailablePeers,
	setPeerSelection,
};
