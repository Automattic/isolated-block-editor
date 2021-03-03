"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFeatureActive = isFeatureActive;

/**
 * Is the feature active?
 * @param {object} state - Current state
 * @param {string} feature - Feature name
 */
function isFeatureActive(state, feature) {
  return state.preferences[feature] ? state.preferences[feature] : false;
}
//# sourceMappingURL=selectors.js.map