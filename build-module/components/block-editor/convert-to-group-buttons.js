import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { _x } from '@wordpress/i18n';
import { switchToBlockType } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { BlockSettingsMenuControls } from '@wordpress/block-editor';
export function ConvertToGroupButton(_ref) {
  var onConvertToGroup = _ref.onConvertToGroup,
      onConvertFromGroup = _ref.onConvertFromGroup,
      _ref$isGroupable = _ref.isGroupable,
      isGroupable = _ref$isGroupable === void 0 ? false : _ref$isGroupable,
      _ref$isUngroupable = _ref.isUngroupable,
      isUngroupable = _ref$isUngroupable === void 0 ? false : _ref$isUngroupable;

  if (!isGroupable && !isUngroupable) {
    return null;
  }

  return createElement(BlockSettingsMenuControls, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, isGroupable && createElement(MenuItem, {
      onClick: function onClick() {
        onConvertToGroup();
        onClose();
      }
    }, _x('Group', 'verb')), isUngroupable && createElement(MenuItem, {
      onClick: function onClick() {
        onConvertFromGroup();
        onClose();
      }
    }, _x('Ungroup', 'Ungrouping blocks from within a Group block back into individual blocks within the Editor ')));
  });
}
export default compose([withSelect(function (select) {
  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlocksByClientId = _select.getBlocksByClientId,
      canInsertBlockType = _select.canInsertBlockType,
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds;

  var _select2 = select('core/blocks'),
      getGroupingBlockName = _select2.getGroupingBlockName;

  var clientIds = getSelectedBlockClientIds();
  var groupingBlockName = getGroupingBlockName();
  var rootClientId = clientIds && clientIds.length > 0 ? getBlockRootClientId(clientIds[0]) : undefined;
  var groupingBlockAvailable = canInsertBlockType(groupingBlockName, rootClientId);
  var blocksSelection = getBlocksByClientId(clientIds);
  var isSingleGroupingBlock = blocksSelection.length === 1 && blocksSelection[0] && blocksSelection[0].name === groupingBlockName; // Do we have
  // 1. Grouping block available to be inserted?
  // 2. One or more blocks selected
  // (we allow single Blocks to become groups unless
  // they are a soltiary group block themselves)

  var isGroupable = groupingBlockAvailable && blocksSelection.length && !isSingleGroupingBlock; // Do we have a single Group Block selected and does that group have inner blocks?

  var isUngroupable = isSingleGroupingBlock && !!blocksSelection[0].innerBlocks.length;
  return {
    clientIds: clientIds,
    isGroupable: isGroupable,
    isUngroupable: isUngroupable,
    blocksSelection: blocksSelection,
    groupingBlockName: groupingBlockName
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      _ref3$blocksSelection = _ref3.blocksSelection,
      blocksSelection = _ref3$blocksSelection === void 0 ? [] : _ref3$blocksSelection,
      groupingBlockName = _ref3.groupingBlockName;

  var _dispatch = dispatch('core/block-editor'),
      replaceBlocks = _dispatch.replaceBlocks;

  return {
    onConvertToGroup: function onConvertToGroup() {
      // Activate the `transform` on the Grouping Block which does the conversion
      var newBlocks = switchToBlockType(blocksSelection, groupingBlockName);

      if (newBlocks) {
        replaceBlocks(clientIds, newBlocks);
      }
    },
    onConvertFromGroup: function onConvertFromGroup() {
      var innerBlocks = blocksSelection[0].innerBlocks;

      if (!innerBlocks.length) {
        return;
      }

      replaceBlocks(clientIds, innerBlocks);
    }
  };
})])(ConvertToGroupButton);
//# sourceMappingURL=convert-to-group-buttons.js.map