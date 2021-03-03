import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import undoable from 'redux-undo';
import isShallowEqual from '@wordpress/is-shallow-equal';
var DEFAULT_STATE = {
  editCount: 0,
  selectionStart: null,
  selectionEnd: null,
  blocks: null
};

var groupBy = function groupBy(action, currentState, previousHistory) {
  return currentState.editCount;
};

function getSelectedBlock(blocks, selection) {
  return blocks.find(function (block) {
    return block.clientId === selection.clientId;
  });
} // Gutenberg triggers a UPDATE_BLOCKS_WITH_UNDO one second after typing. Try and group this with the previous edits


function isNewUndo(action, state) {
  var type = action.type,
      selectionStart = action.selectionStart,
      selectionEnd = action.selectionEnd; // Don't create a new undo when flagged as no undo

  if (type === 'UPDATE_BLOCKS_WITHOUT_UNDO') {
    return false;
  } // Not new if selection is same


  if (isShallowEqual(selectionStart, state.selectionStart) && isShallowEqual(selectionEnd, state.selectionEnd)) {
    var previousBlock = getSelectedBlock(state.blocks, selectionStart);
    var currentBlock = getSelectedBlock(action.blocks, selectionStart); // Check if any attributes have changed in the selected block

    if (previousBlock && currentBlock && isShallowEqual(previousBlock.attributes, currentBlock.attributes)) {
      // Nothing has changed - not a new undo level
      return false;
    }
  } // Yes, a new undo level


  return true;
}

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_BLOCKS_WITHOUT_UNDO':
    case 'UPDATE_BLOCKS_WITH_UNDO':
      return _objectSpread(_objectSpread({}, state), {}, {
        editCount: isNewUndo(action, state) ? state.editCount + 1 : state.editCount,
        selectionStart: action.selectionStart,
        selectionEnd: action.selectionEnd,
        blocks: action.blocks
      });
  }

  return state;
};

export default undoable(reducer, {
  groupBy: groupBy
});
//# sourceMappingURL=reducer.js.map