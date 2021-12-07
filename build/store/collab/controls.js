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

var debugUndo = require('debug')('iso-editor:collab:undo');

var applyChangesToYDoc = (0, _data.createRegistryControl)(function (registry) {
  return function (action) {
    var doc = registry.select('isolated/editor').getYDoc();

    if (doc && !action.isTriggeredByYDoc) {
      doc.applyChangesToYDoc({
        blocks: action.blocks
      }, {
        isInitialContent: action.isInitialContent
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
    return; // prevent default action
  };
})), (0, _defineProperty2["default"])(_UPDATE_BLOCKS_WITH_U, _reduxUndo.ActionCreators.redo().type, (0, _data.createRegistryControl)(function (registry) {
  return function (action) {
    var undoManager = registry.select('isolated/editor').getUndoManager();

    if (!undoManager) {
      return action;
    }

    debugUndo('redo');
    registry.select('isolated/editor').getUndoManager().redo();
    return; // prevent default action
  };
})), _UPDATE_BLOCKS_WITH_U);

exports["default"] = _default;
//# sourceMappingURL=controls.js.map