"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertToGroupButton = ConvertToGroupButton;
exports["default"] = void 0;

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
function ConvertToGroupButton(_ref) {
  var onConvertToGroup = _ref.onConvertToGroup,
      onConvertFromGroup = _ref.onConvertFromGroup,
      _ref$isGroupable = _ref.isGroupable,
      isGroupable = _ref$isGroupable === void 0 ? false : _ref$isGroupable,
      _ref$isUngroupable = _ref.isUngroupable,
      isUngroupable = _ref$isUngroupable === void 0 ? false : _ref$isUngroupable;

  if (!isGroupable && !isUngroupable) {
    return null;
  }

  return createElement(_blockEditor.BlockSettingsMenuControls, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, isGroupable && createElement(_components.MenuItem, {
      onClick: function onClick() {
        onConvertToGroup();
        onClose();
      }
    }, (0, _i18n._x)('Group', 'verb')), isUngroupable && createElement(_components.MenuItem, {
      onClick: function onClick() {
        onConvertFromGroup();
        onClose();
      }
    }, (0, _i18n._x)('Ungroup', 'Ungrouping blocks from within a Group block back into individual blocks within the Editor ')));
  });
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
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
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      _ref3$blocksSelection = _ref3.blocksSelection,
      blocksSelection = _ref3$blocksSelection === void 0 ? [] : _ref3$blocksSelection,
      groupingBlockName = _ref3.groupingBlockName;

  var _dispatch = dispatch('core/block-editor'),
      replaceBlocks = _dispatch.replaceBlocks;

  return {
    onConvertToGroup: function onConvertToGroup() {
      // Activate the `transform` on the Grouping Block which does the conversion
      var newBlocks = (0, _blocks.switchToBlockType)(blocksSelection, groupingBlockName);

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

exports["default"] = _default;
//# sourceMappingURL=convert-to-group-buttons.js.map