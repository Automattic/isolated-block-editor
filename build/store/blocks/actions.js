"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _reduxUndo = require("redux-undo");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var actions = {
  undo: /*#__PURE__*/_regenerator["default"].mark(function undo() {
    return _regenerator["default"].wrap(function undo$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _reduxUndo.ActionCreators.undo();
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, undo);
  }),
  redo: /*#__PURE__*/_regenerator["default"].mark(function redo() {
    return _regenerator["default"].wrap(function redo$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _reduxUndo.ActionCreators.redo();
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, redo);
  }),
  /**
   * Update blocks without undo history
   *
   * @param {object[]} blocks
   * @param {Object} options
   */
  updateBlocksWithUndo: function updateBlocksWithUndo(blocks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _objectSpread({
              type: 'UPDATE_BLOCKS_WITH_UNDO',
              blocks: blocks
            }, options);
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee);
    })();
  },
  /**
   * Update blocks without undo history
   *
   * @param {object[]} blocks
   * @param {Object} options
   */
  updateBlocksWithoutUndo: function updateBlocksWithoutUndo(blocks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _objectSpread({
              type: 'UPDATE_BLOCKS_WITHOUT_UNDO',
              blocks: blocks
            }, options);
          case 2:
            return _context4.abrupt("return", _context4.sent);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee2);
    })();
  }
};
var _default = exports["default"] = actions;
//# sourceMappingURL=actions.js.map