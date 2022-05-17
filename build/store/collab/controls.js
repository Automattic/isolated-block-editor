"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reduxUndo = require("redux-undo");

var _data = require("@wordpress/data");

var _UPDATE_BLOCKS_WITH_U;

var debugUndo = require('debug')('iso-editor:collab:undo'); // TODO: Unsolved problem

/**
 * Return the clientId and block attribute key if the current selection can be
 * associated with a RichText attribute.
 *
 * Caution: This won't return false positives, but it will return false negatives.
 * Currently the only way of telling whether a given block attribute is associated with a `<RichText>`
 * in the editor is for it to be passed an `identifier` prop with the block attribute key,
 * e.g. `<RichText identifier="myAttributeKey" />`. If the block developer has neglected to do this,
 * the selection.attributeKey will fall back to a `number`, and we can't tell which attribute it's
 * actually associated with. This happens a lot because the `identifier` prop is undocumented.
 *
 * @param registry
 * @return {import('../../components/collaborative-editing').RichTextHint|undefined}
 */


var getRichTextHint = function getRichTextHint(registry) {
  var _registry$select$getS = registry.select('core/block-editor').getSelectionStart(),
      clientId = _registry$select$getS.clientId,
      attributeKey = _registry$select$getS.attributeKey; // If the selection has an attribute key that is a string, we can deduce that the attribute is a RichText


  return typeof attributeKey === 'string' ? {
    clientId: clientId,
    attributeKey: attributeKey
  } : undefined;
};

var applyChangesToYDoc = (0, _data.createRegistryControl)(function (registry) {
  return function (action) {
    var doc = registry.select('isolated/editor').getYDoc(); // If the change is triggered locally from the editor (i.e. is neither a remote change nor an undo/redo),
    // apply those changes to the Yjs doc.

    if (doc && !action.isTriggeredByYDoc) {
      doc.applyLocalChangesToYDoc({
        blocks: action.blocks
      }, {
        isInitialContent: action.isInitialContent,
        richTextHint: getRichTextHint(registry)
      });
    }

    return action;
  };
});

var _default = (_UPDATE_BLOCKS_WITH_U = {
  UPDATE_BLOCKS_WITH_UNDO: applyChangesToYDoc,
  UPDATE_BLOCKS_WITHOUT_UNDO: applyChangesToYDoc
}, (0, _defineProperty2["default"])(_UPDATE_BLOCKS_WITH_U, _reduxUndo.ActionCreators.undo().type, (0, _data.createRegistryControl)(function (registry) {
  return function (action) {
    var undoManager = registry.select('isolated/editor').getUndoManager();

    if (!undoManager) {
      return action;
    }

    debugUndo('undo');
    undoManager.undo();
    return undefined; // prevent default action
  };
})), (0, _defineProperty2["default"])(_UPDATE_BLOCKS_WITH_U, _reduxUndo.ActionCreators.redo().type, (0, _data.createRegistryControl)(function (registry) {
  return function (action) {
    var undoManager = registry.select('isolated/editor').getUndoManager();

    if (!undoManager) {
      return action;
    }

    debugUndo('redo');
    registry.select('isolated/editor').getUndoManager().redo();
    return undefined; // prevent default action
  };
})), _UPDATE_BLOCKS_WITH_U);

exports["default"] = _default;
//# sourceMappingURL=controls.js.map