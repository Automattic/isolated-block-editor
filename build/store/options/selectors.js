"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOptionActive = isOptionActive;

/**
 * Get the option value
 *
 * @param {object} state - Current state
 * @param {string} option - Option name
 * @returns {boolean}
 */
function isOptionActive(state, option) {
  return state.options[option] ? state.options[option] : false;
}
//# sourceMappingURL=selectors.js.map