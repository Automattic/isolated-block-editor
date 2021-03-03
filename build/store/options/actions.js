"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var actions = {
  /**
   * Toggle the option
   * @param {string} option Option name
   */
  toggleOption: function toggleOption(option) {
    return {
      type: 'TOGGLE_OPTION',
      option: option
    };
  }
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map