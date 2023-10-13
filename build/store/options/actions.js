"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var actions = {
  /**
   * Toggle the option
   *
   * @param {string} option Option name
   */
  toggleOption: function toggleOption(option) {
    return {
      type: 'TOGGLE_OPTION',
      option: option
    };
  }
};
var _default = exports["default"] = actions;
//# sourceMappingURL=actions.js.map