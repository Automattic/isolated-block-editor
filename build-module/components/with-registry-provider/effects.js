import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { findKey } from 'lodash';
/**
 * WordPress dependencies
 */

import { speak } from '@wordpress/a11y';
import { getBlockType, doBlocksMatchTemplate, switchToBlockType, synchronizeBlocksWithTemplate, cloneBlock } from '@wordpress/blocks';
import { _n, sprintf } from '@wordpress/i18n';
import { create, toHTMLString, insert, remove } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { storeConfig as blockEditorStoreConfig } from '@wordpress/block-editor';
var _blockEditorStoreConf = blockEditorStoreConfig.actions,
    replaceBlocks = _blockEditorStoreConf.replaceBlocks,
    selectBlock = _blockEditorStoreConf.selectBlock,
    setTemplateValidity = _blockEditorStoreConf.setTemplateValidity,
    resetBlocks = _blockEditorStoreConf.resetBlocks,
    selectionChange = _blockEditorStoreConf.selectionChange;
var _blockEditorStoreConf2 = blockEditorStoreConfig.selectors,
    getBlock = _blockEditorStoreConf2.getBlock,
    getBlocks = _blockEditorStoreConf2.getBlocks,
    getSelectedBlockCount = _blockEditorStoreConf2.getSelectedBlockCount,
    getTemplateLock = _blockEditorStoreConf2.getTemplateLock,
    getTemplate = _blockEditorStoreConf2.getTemplate,
    isValidTemplate = _blockEditorStoreConf2.isValidTemplate,
    getSelectionStart = _blockEditorStoreConf2.getSelectionStart;
/**
 * Block validity is a function of blocks state (at the point of a
 * reset) and the template setting. As a compromise to its placement
 * across distinct parts of state, it is implemented here as a side-
 * effect of the block reset action.
 *
 * @param {Object} action RESET_BLOCKS action.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} New validity set action if validity has changed.
 */

export function validateBlocksToTemplate(action, store) {
  var state = store.getState();
  var template = getTemplate(state);
  var templateLock = getTemplateLock(state); // Unlocked templates are considered always valid because they act
  // as default values only.

  var isBlocksValidToTemplate = !template || templateLock !== 'all' || doBlocksMatchTemplate(action.blocks, template); // Update if validity has changed.

  if (isBlocksValidToTemplate !== isValidTemplate(state)) {
    return setTemplateValidity(isBlocksValidToTemplate);
  }
}
export default {
  MERGE_BLOCKS: function MERGE_BLOCKS(action, store) {
    var dispatch = store.dispatch;
    var state = store.getState();

    var _action$blocks = _slicedToArray(action.blocks, 2),
        clientIdA = _action$blocks[0],
        clientIdB = _action$blocks[1];

    var blockA = getBlock(state, clientIdA);
    var blockAType = getBlockType(blockA.name); // Only focus the previous block if it's not mergeable

    if (!blockAType.merge) {
      dispatch(selectBlock(blockA.clientId));
      return;
    }

    var blockB = getBlock(state, clientIdB);
    var blockBType = getBlockType(blockB.name);

    var _getSelectionStart = getSelectionStart(state),
        clientId = _getSelectionStart.clientId,
        attributeKey = _getSelectionStart.attributeKey,
        offset = _getSelectionStart.offset;

    var selectedBlockType = clientId === clientIdA ? blockAType : blockBType;
    var attributeDefinition = selectedBlockType.attributes[attributeKey];
    var canRestoreTextSelection = (clientId === clientIdA || clientId === clientIdB) && attributeKey !== undefined && offset !== undefined && // We cannot restore text selection if the RichText identifier
    // is not a defined block attribute key. This can be the case if the
    // fallback intance ID is used to store selection (and no RichText
    // identifier is set), or when the identifier is wrong.
    !!attributeDefinition;

    if (!attributeDefinition) {
      if (typeof attributeKey === 'number') {
        window.console.error("RichText needs an identifier prop that is the block attribute key of the attribute it controls. Its type is expected to be a string, but was ".concat(_typeof(attributeKey)));
      } else {
        window.console.error('The RichText identifier prop does not match any attributes defined by the block.');
      }
    } // A robust way to retain selection position through various transforms
    // is to insert a special character at the position and then recover it.


    var START_OF_SELECTED_AREA = "\x86"; // Clone the blocks so we don't insert the character in a "live" block.

    var cloneA = cloneBlock(blockA);
    var cloneB = cloneBlock(blockB);

    if (canRestoreTextSelection) {
      var selectedBlock = clientId === clientIdA ? cloneA : cloneB;
      var html = selectedBlock.attributes[attributeKey];
      var multilineTag = attributeDefinition.multiline,
          multilineWrapperTags = attributeDefinition.__unstableMultilineWrapperTags,
          preserveWhiteSpace = attributeDefinition.__unstablePreserveWhiteSpace;
      var value = insert(create({
        html: html,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineWrapperTags,
        preserveWhiteSpace: preserveWhiteSpace
      }), START_OF_SELECTED_AREA, offset, offset);
      selectedBlock.attributes[attributeKey] = toHTMLString({
        value: value,
        multilineTag: multilineTag,
        preserveWhiteSpace: preserveWhiteSpace
      });
    } // We can only merge blocks with similar types
    // thus, we transform the block to merge first


    var blocksWithTheSameType = blockA.name === blockB.name ? [cloneB] : switchToBlockType(cloneB, blockA.name); // If the block types can not match, do nothing

    if (!blocksWithTheSameType || !blocksWithTheSameType.length) {
      return;
    } // Calling the merge to update the attributes and remove the block to be merged


    var updatedAttributes = blockAType.merge(cloneA.attributes, blocksWithTheSameType[0].attributes);

    if (canRestoreTextSelection) {
      var newAttributeKey = findKey(updatedAttributes, function (v) {
        return typeof v === 'string' && v.indexOf(START_OF_SELECTED_AREA) !== -1;
      });
      var convertedHtml = updatedAttributes[newAttributeKey];
      var _blockAType$attribute = blockAType.attributes[newAttributeKey],
          _multilineTag = _blockAType$attribute.multiline,
          _multilineWrapperTags = _blockAType$attribute.__unstableMultilineWrapperTags,
          _preserveWhiteSpace = _blockAType$attribute.__unstablePreserveWhiteSpace;
      var convertedValue = create({
        html: convertedHtml,
        multilineTag: _multilineTag,
        multilineWrapperTags: _multilineWrapperTags,
        preserveWhiteSpace: _preserveWhiteSpace
      });
      var newOffset = convertedValue.text.indexOf(START_OF_SELECTED_AREA);
      var newValue = remove(convertedValue, newOffset, newOffset + 1);
      var newHtml = toHTMLString({
        value: newValue,
        multilineTag: _multilineTag,
        preserveWhiteSpace: _preserveWhiteSpace
      });
      updatedAttributes[newAttributeKey] = newHtml;
      dispatch(selectionChange(blockA.clientId, newAttributeKey, newOffset, newOffset));
    }

    dispatch(replaceBlocks([blockA.clientId, blockB.clientId], [_objectSpread(_objectSpread({}, blockA), {}, {
      attributes: _objectSpread(_objectSpread({}, blockA.attributes), updatedAttributes)
    })].concat(_toConsumableArray(blocksWithTheSameType.slice(1)))));
  },
  RESET_BLOCKS: [validateBlocksToTemplate],
  MULTI_SELECT: function MULTI_SELECT(action, _ref) {
    var getState = _ref.getState;
    var blockCount = getSelectedBlockCount(getState());
    speak(sprintf(
    /* translators: %s: number of selected blocks */
    _n('%s block selected.', '%s blocks selected.', blockCount), blockCount), 'assertive');
  },
  SYNCHRONIZE_TEMPLATE: function SYNCHRONIZE_TEMPLATE(action, _ref2) {
    var getState = _ref2.getState;
    var state = getState();
    var blocks = getBlocks(state);
    var template = getTemplate(state);
    var updatedBlockList = synchronizeBlocksWithTemplate(blocks, template);
    return resetBlocks(updatedBlockList);
  },
  MARK_AUTOMATIC_CHANGE: function MARK_AUTOMATIC_CHANGE(action, store) {
    var _window = window,
        setTimeout = _window.setTimeout,
        _window$requestIdleCa = _window.requestIdleCallback,
        requestIdleCallback = _window$requestIdleCa === void 0 ? function (callback) {
      return setTimeout(callback, 100);
    } : _window$requestIdleCa;
    requestIdleCallback(function () {
      store.dispatch({
        type: 'MARK_AUTOMATIC_CHANGE_FINAL'
      });
    });
  }
};
//# sourceMappingURL=effects.js.map