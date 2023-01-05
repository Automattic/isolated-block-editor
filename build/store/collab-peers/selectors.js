"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollabPeers = getCollabPeers;
exports.hasCollabPeers = hasCollabPeers;
function getCollabPeers(state) {
  return state.collabPeers;
}
function hasCollabPeers(state) {
  return Object.keys(state.collabPeers).length > 0;
}
//# sourceMappingURL=selectors.js.map