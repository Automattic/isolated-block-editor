"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__experimentalIsEditingReusableBlock = __experimentalIsEditingReusableBlock;

/**
 * Returns true if reusable block is in the editing state.
 *
 * @param {Object} state Global application state.
 * @param {number} clientId the clientID of the block.
 * @return {boolean} Whether the reusable block is in the editing state.
 */
function __experimentalIsEditingReusableBlock(state, clientId) {
  return state.isEditingReusableBlock[clientId];
}
//# sourceMappingURL=selectors.js.map