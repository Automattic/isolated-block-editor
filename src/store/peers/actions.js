/**
 * @param {string[]} peers
 */
export function setAvailablePeers( peers ) {
	return {
		type: 'SET_AVAILABLE_PEERS',
		peers,
	};
}

/**
 * @param {string} peer
 * @param {import('../..').EditorSelection} selection
 * @param {string} color
 */
export function setPeerSelection( peer, selection, color ) {
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
