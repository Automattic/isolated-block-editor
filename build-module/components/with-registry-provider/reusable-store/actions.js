import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(__experimentalConvertBlockToStatic),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(__experimentalConvertBlocksToReusable),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(__experimentalDeleteReusableBlock);

/**
 * Internal dependencies
 */
import { convertBlockToStatic, convertBlocksToReusable, deleteReusableBlock } from './controls';
/**
 * Returns a generator converting a reusable block into a static block.
 *
 * @param {string} clientId The client ID of the block to attach.
 */

export function __experimentalConvertBlockToStatic(clientId) {
  return _regeneratorRuntime.wrap(function __experimentalConvertBlockToStatic$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return convertBlockToStatic(clientId);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Returns a generator converting one or more static blocks into a reusable block.
 *
 * @param {string[]} clientIds The client IDs of the block to detach.
 */

export function __experimentalConvertBlocksToReusable(clientIds) {
  return _regeneratorRuntime.wrap(function __experimentalConvertBlocksToReusable$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return convertBlocksToReusable(clientIds);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Returns a generator deleting a reusable block.
 *
 * @param {string} id The ID of the reusable block to delete.
 */

export function __experimentalDeleteReusableBlock(id) {
  return _regeneratorRuntime.wrap(function __experimentalDeleteReusableBlock$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return deleteReusableBlock(id);

        case 2:
        case "end":
          return _context3.stop();
      }
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

export function __experimentalSetEditingReusableBlock(clientId, isEditing) {
  return {
    type: 'SET_EDITING_REUSABLE_BLOCK',
    clientId: clientId,
    isEditing: isEditing
  };
}
//# sourceMappingURL=actions.js.map