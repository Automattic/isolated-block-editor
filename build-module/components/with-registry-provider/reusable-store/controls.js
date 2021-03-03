import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

/**
 * WordPress dependencies
 */
import { isReusableBlock, createBlock, parse, serialize } from '@wordpress/blocks';
import { createRegistryControl } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Convert a reusable block to a static block effect handler
 *
 * @param {string}  clientId Block ID.
 * @return {Object} control descriptor.
 */

export function convertBlockToStatic(clientId) {
  return {
    type: 'CONVERT_BLOCK_TO_STATIC',
    clientId: clientId
  };
}
/**
 * Convert a static block to a reusable block effect handler
 *
 * @param {Array}  clientIds Block IDs.
 * @return {Object} control descriptor.
 */

export function convertBlocksToReusable(clientIds) {
  return {
    type: 'CONVERT_BLOCKS_TO_REUSABLE',
    clientIds: clientIds
  };
}
/**
 * Deletes a reusable block.
 *
 * @param {string} id Reusable block ID.
 * @return {Object} control descriptor.
 */

export function deleteReusableBlock(id) {
  return {
    type: 'DELETE_REUSABLE_BLOCK',
    id: id
  };
}
var controls = {
  CONVERT_BLOCK_TO_STATIC: createRegistryControl(function (registry) {
    return function (_ref) {
      var clientId = _ref.clientId;
      var oldBlock = registry.select('core/block-editor').getBlock(clientId);
      var reusableBlock = registry.select('core').getEditedEntityRecord('postType', 'wp_block', oldBlock.attributes.ref);
      var newBlocks = parse(reusableBlock.content);
      registry.dispatch('core/block-editor').replaceBlocks(oldBlock.clientId, newBlocks);
    };
  }),
  CONVERT_BLOCKS_TO_REUSABLE: createRegistryControl(function (registry) {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
        var clientIds, reusableBlock, updatedRecord, newBlock;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clientIds = _ref2.clientIds;
                reusableBlock = {
                  title: __('Untitled Reusable Block'),
                  content: serialize(registry.select('core/block-editor').getBlocksByClientId(clientIds)),
                  status: 'publish'
                };
                _context.next = 4;
                return registry.dispatch('core').saveEntityRecord('postType', 'wp_block', reusableBlock);

              case 4:
                updatedRecord = _context.sent;
                newBlock = createBlock('core/block', {
                  ref: updatedRecord.id
                });
                registry.dispatch('core/block-editor').replaceBlocks(clientIds, newBlock);

                registry.dispatch(reusableBlocksStore).__experimentalSetEditingReusableBlock(newBlock.clientId, true);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();
  }),
  DELETE_REUSABLE_BLOCK: createRegistryControl(function (registry) {
    return /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref4) {
        var id, reusableBlock, allBlocks, associatedBlocks, associatedBlockClientIds;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref4.id;
                reusableBlock = registry.select('core').getEditedEntityRecord('postType', 'wp_block', id); // Don't allow a reusable block with a temporary ID to be deleted

                if (reusableBlock) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                // Remove any other blocks that reference this reusable block
                allBlocks = registry.select('core/block-editor').getBlocks();
                associatedBlocks = allBlocks.filter(function (block) {
                  return isReusableBlock(block) && block.attributes.ref === id;
                });
                associatedBlockClientIds = associatedBlocks.map(function (block) {
                  return block.clientId;
                }); // Remove the parsed block.

                if (associatedBlockClientIds.length) {
                  registry.dispatch('core/block-editor').removeBlocks(associatedBlockClientIds);
                }

                _context2.next = 10;
                return registry.dispatch('core').deleteEntityRecord('postType', 'wp_block', id);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }();
  })
};
export default controls;
//# sourceMappingURL=controls.js.map