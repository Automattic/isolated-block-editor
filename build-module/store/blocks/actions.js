import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { ActionCreators } from 'redux-undo';
var actions = {
  undo: function undo() {
    return ActionCreators.undo();
  },
  redo: function redo() {
    return ActionCreators.redo();
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
export default actions;
//# sourceMappingURL=actions.js.map