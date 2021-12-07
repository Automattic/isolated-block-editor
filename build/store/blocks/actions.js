"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reduxUndo = require("redux-undo");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actions = {
  undo: /*#__PURE__*/_regenerator["default"].mark(function undo() {
    return _regenerator["default"].wrap(function undo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _reduxUndo.ActionCreators.undo();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, undo);
  }),
  redo: /*#__PURE__*/_regenerator["default"].mark(function redo() {
    return _regenerator["default"].wrap(function redo$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _reduxUndo.ActionCreators.redo();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, redo);
  }),

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithUndo: /*#__PURE__*/_regenerator["default"].mark(function updateBlocksWithUndo(blocks) {
    var options,
        _args3 = arguments;
    return _regenerator["default"].wrap(function updateBlocksWithUndo$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _context3.next = 3;
            return _objectSpread({
              type: 'UPDATE_BLOCKS_WITH_UNDO',
              blocks: blocks
            }, options);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, updateBlocksWithUndo);
  }),

  /**
   * Update blocks without undo history
   * @param {object[]} blocks
   * @param {object} options
   */
  updateBlocksWithoutUndo: /*#__PURE__*/_regenerator["default"].mark(function updateBlocksWithoutUndo(blocks) {
    var options,
        _args4 = arguments;
    return _regenerator["default"].wrap(function updateBlocksWithoutUndo$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.next = 3;
            return _objectSpread({
              type: 'UPDATE_BLOCKS_WITHOUT_UNDO',
              blocks: blocks
            }, options);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, updateBlocksWithoutUndo);
  })
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map