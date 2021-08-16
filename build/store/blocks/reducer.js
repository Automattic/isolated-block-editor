"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reduxUndo = _interopRequireDefault(require("redux-undo"));

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_STATE = {
  editCount: 0,
  selection: null,
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
      selection = action.selection; // Don't create a new undo when flagged as no undo

  if (type === 'UPDATE_BLOCKS_WITHOUT_UNDO') {
    return false;
  }

  if (!selection) {
    return true;
  } // Not new if selection is same


  if ((0, _isShallowEqual["default"])(selection, state.selection)) {
    var previousBlock = getSelectedBlock(state.blocks, selection.selectionStart);
    var currentBlock = getSelectedBlock(action.blocks, selection.selectionStart); // Check if any attributes have changed in the selected block

    if (previousBlock && currentBlock && (0, _isShallowEqual["default"])(previousBlock.attributes, currentBlock.attributes)) {
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
        blocks: action.blocks,
        selection: action.selection
      });
  }

  return state;
};

var _default = (0, _reduxUndo["default"])(reducer, {
  groupBy: groupBy
});

exports["default"] = _default;
//# sourceMappingURL=reducer.js.map