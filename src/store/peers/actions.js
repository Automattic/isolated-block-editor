/**
 * @param {string[]} peers Peer ids.
 */
export function setAvailablePeers( peers ) {
	return {
		type: 'SET_AVAILABLE_PEERS',
		peers,
	};
}

/**
 * @param {string} peer Peer id.
 * @param {import('../..').EditorSelection} selection
 * @param {string} color Hex values prefixed by #.
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
