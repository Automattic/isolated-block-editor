/**
 * @param {import('../../components/collaborative-editing').AvailablePeer[]} peers
 */
export function setAvailableCollabPeers(peers) {
  return {
    type: 'SET_AVAILABLE_COLLAB_PEERS',
    peers
  };
}

/**
 * @param {string} peerId
 * @param {import('../../components/collaborative-editing').EditorSelection} selection
 */
export function setCollabPeerSelection(peerId, selection) {
  return {
    type: 'SET_COLLAB_PEER_SELECTION',
    peerId,
    selection
  };
}
//# sourceMappingURL=actions.js.map