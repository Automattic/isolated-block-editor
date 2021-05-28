"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reduxUndo = require("redux-undo");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actions = {
  undo: function undo() {
    return _reduxUndo.ActionCreators.undo();
  },
  redo: function redo() {
    return _reduxUndo.ActionCreators.redo();
  },

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithUndo: function updateBlocksWithUndo(blocks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _objectSpread({
      type: 'UPDATE_BLOCKS_WITH_UNDO',
      blocks: blocks
    }, options);
  },

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithoutUndo: function updateBlocksWithoutUndo(blocks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _objectSpread({
      type: 'UPDATE_BLOCKS_WITHOUT_UNDO',
      blocks: blocks
    }, options);
  }
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map