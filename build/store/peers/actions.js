"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.setAvailablePeers = setAvailablePeers;
exports.setPeerSelection = setPeerSelection;

/**
 * @param {import('../../components/collaborative-editing').AvailablePeer[]} peers
 */
function setAvailablePeers(peers) {
  return {
    type: 'SET_AVAILABLE_PEERS',
    peers: peers
  };
}
/**
 * @param {string} peerId
 * @param {import('../../components/collaborative-editing').EditorSelection} selection
 */


function setPeerSelection(peerId, selection) {
  return {
    type: 'SET_PEER_SELECTION',
    peerId: peerId,
    selection: selection
  };
}

var _default = {
  setAvailablePeers: setAvailablePeers,
  setPeerSelection: setPeerSelection
};
exports["default"] = _default;
//# sourceMappingURL=actions.js.map