"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPeers = getPeers;
exports.hasPeers = hasPeers;

function getPeers(state) {
  return state.peers;
}

function hasPeers(state) {
  return Object.keys(state.peers).length > 0;
}
//# sourceMappingURL=selectors.js.map