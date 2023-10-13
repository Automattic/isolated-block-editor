"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _reduxUndo = _interopRequireDefault(require("redux-undo"));
var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * WordPress dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
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
}

// Gutenberg triggers a UPDATE_BLOCKS_WITH_UNDO one second after typing. Try and group this with the previous edits
function isNewUndo(action, state) {
  var type = action.type,
    selection = action.selection;

  // Don't create a new undo when flagged as no undo
  if (type === 'UPDATE_BLOCKS_WITHOUT_UNDO') {
    return false;
  }
  if (!selection) {
    return true;
  }

  // Not new if selection is same
  if ((0, _isShallowEqual["default"])(selection, state.selection)) {
    var previousBlock = getSelectedBlock(state.blocks, selection.selectionStart);
    var currentBlock = getSelectedBlock(action.blocks, selection.selectionStart);

    // Check if any attributes have changed in the selected block
    if (previousBlock && currentBlock && (0, _isShallowEqual["default"])(previousBlock.attributes, currentBlock.attributes)) {
      // Nothing has changed - not a new undo level
      return false;
    }
  }

  // Yes, a new undo level
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
var _default = exports["default"] = (0, _reduxUndo["default"])(reducer, {
  groupBy: groupBy
});
//# sourceMappingURL=reducer.js.map