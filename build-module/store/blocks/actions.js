import { ActionCreators } from 'redux-undo';
const actions = {
  undo() {
    return ActionCreators.undo();
  },

  redo() {
    return ActionCreators.redo();
  },

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithUndo(blocks) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return {
      type: 'UPDATE_BLOCKS_WITH_UNDO',
      blocks,
      ...options
    };
  },

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithoutUndo(blocks) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return {
      type: 'UPDATE_BLOCKS_WITHOUT_UNDO',
      blocks,
      ...options
    };
  }

};
export default actions;
//# sourceMappingURL=actions.js.map