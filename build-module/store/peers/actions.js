/**
 * @param {import('../../').AvailablePeer[]} peers
 */
export function setAvailablePeers(peers) {
  return {
    type: 'SET_AVAILABLE_PEERS',
    peers
  };
}
/**
 * @param {string} peerId
 * @param {import('../..').EditorSelection} selection
 */

export function setPeerSelection(peerId, selection) {
  return {
    type: 'SET_PEER_SELECTION',
    peerId,
    selection
  };
}
export default {
  setAvailablePeers,
  setPeerSelection
};
//# sourceMappingURL=actions.js.map