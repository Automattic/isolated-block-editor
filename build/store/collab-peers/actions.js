"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAvailableCollabPeers = setAvailableCollabPeers;
exports.setCollabPeerSelection = setCollabPeerSelection;
/**
 * @param {import('../../components/collaborative-editing').AvailablePeer[]} peers
 */
function setAvailableCollabPeers(peers) {
  return {
    type: 'SET_AVAILABLE_COLLAB_PEERS',
    peers: peers
  };
}

/**
 * @param {string} peerId
 * @param {import('../../components/collaborative-editing').EditorSelection} selection
 */
function setCollabPeerSelection(peerId, selection) {
  return {
    type: 'SET_COLLAB_PEER_SELECTION',
    peerId: peerId,
    selection: selection
  };
}
//# sourceMappingURL=actions.js.map