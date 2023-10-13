"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFeatureActive = isFeatureActive;
/**
 * Is the feature active?
 *
 * @param {Object} state - Current state
 * @param {string} feature - Feature name
 * @param {boolean} [defaultValue=false] - Default value
 */
function isFeatureActive(state, feature) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return state.preferences[feature] === undefined ? defaultValue : state.preferences[feature];
}
//# sourceMappingURL=selectors.js.map