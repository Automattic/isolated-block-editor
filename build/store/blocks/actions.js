"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _reduxUndo = require("redux-undo");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map