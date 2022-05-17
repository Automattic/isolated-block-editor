"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOptionActive = isOptionActive;

/**
 * Get the option value
 *
 * @param {Object} state - Current state
 * @param {string} option - Option name
 * @return {boolean}
 */
function isOptionActive(state, option) {
  return state.options[option] ? state.options[option] : false;
}
//# sourceMappingURL=selectors.js.map