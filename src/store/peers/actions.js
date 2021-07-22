function setAvailablePeers( peers ) {
	return {
		type: 'SET_AVAILABLE_PEERS',
		peers,
	};
}

function setPeerSelection( peer, selection, color ) {
	return {
		type: 'SET_PEER_SELECTION',
		peer,
		selection,
		color,
	};
}

export default {
	setAvailablePeers,
	setPeerSelection,
};
