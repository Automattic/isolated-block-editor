"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var actions = {
  /**
   * Toggle the feature
   *
   * @param {string} feature - Feature name
   */
  toggleFeature: function toggleFeature(feature) {
    return {
      type: 'TOGGLE_FEATURE',
      feature: feature
    };
  }
};
var _default = exports["default"] = actions;
//# sourceMappingURL=actions.js.map