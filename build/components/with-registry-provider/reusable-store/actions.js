"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__experimentalConvertBlockToStatic = __experimentalConvertBlockToStatic;
exports.__experimentalConvertBlocksToReusable = __experimentalConvertBlocksToReusable;
exports.__experimentalDeleteReusableBlock = __experimentalDeleteReusableBlock;
exports.__experimentalSetEditingReusableBlock = __experimentalSetEditingReusableBlock;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _controls = require("./controls");
var _marked = /*#__PURE__*/_regenerator["default"].mark(__experimentalConvertBlockToStatic),
  _marked2 = /*#__PURE__*/_regenerator["default"].mark(__experimentalConvertBlocksToReusable),
  _marked3 = /*#__PURE__*/_regenerator["default"].mark(__experimentalDeleteReusableBlock);
/**
 * Returns a generator converting a reusable block into a static block.
 *
 * @param {string} clientId The client ID of the block to attach.
 */
function __experimentalConvertBlockToStatic(clientId) {
  return _regenerator["default"].wrap(function __experimentalConvertBlockToStatic$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _controls.convertBlockToStatic)(clientId);
      case 2:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

/**
 * Returns a generator converting one or more static blocks into a reusable block.
 *
 * @param {string[]} clientIds The client IDs of the block to detach.
 */
function __experimentalConvertBlocksToReusable(clientIds) {
  return _regenerator["default"].wrap(function __experimentalConvertBlocksToReusable$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return (0, _controls.convertBlocksToReusable)(clientIds);
      case 2:
      case "end":
        return _context2.stop();
    }
  }, _marked2);
}

/**
 * Returns a generator deleting a reusable block.
 *
 * @param {string} id The ID of the reusable block to delete.
 */
function __experimentalDeleteReusableBlock(id) {
  return _regenerator["default"].wrap(function __experimentalDeleteReusableBlock$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return (0, _controls.deleteReusableBlock)(id);
      case 2:
      case "end":
        return _context3.stop();
    }
  }, _marked3);
}

/**
 * Returns an action descriptor for SET_EDITING_REUSABLE_BLOCK action.
 *
 * @param {string} clientId The clientID of the reusable block to target.
 * @param {boolean} isEditing Whether the block should be in editing state.
 * @return {Object} Action descriptor.
 */
function __experimentalSetEditingReusableBlock(clientId, isEditing) {
  return {
    type: 'SET_EDITING_REUSABLE_BLOCK',
    clientId: clientId,
    isEditing: isEditing
  };
}
//# sourceMappingURL=actions.js.map