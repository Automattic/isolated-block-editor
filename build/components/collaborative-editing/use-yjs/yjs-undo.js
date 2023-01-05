"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupUndoManager = setupUndoManager;
var yjs = _interopRequireWildcard(require("yjs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * External dependencies
 */

var debugUndo = require('debug')('iso-editor:collab:undo');

/**
 * Set up undo handling.
 *
 * @param {yjs.AbstractType} typeScope - Yjs type to initialize the undo manager with.
 * @param {string} identity
 * @param {Object} registry - Registry object from `@wordpress/data`.
 */
function setupUndoManager(typeScope, identity, registry) {
  var dispatch = registry.dispatch,
    select = registry.select;
  var getSelection = function getSelection() {
    return {
      start: select('core/block-editor').getSelectionStart(),
      end: select('core/block-editor').getSelectionEnd()
    };
  };
  var setSelection = function setSelection(_ref) {
    var start = _ref.start,
      end = _ref.end;
    return dispatch('core/block-editor').selectionChange(start === null || start === void 0 ? void 0 : start.clientId, start === null || start === void 0 ? void 0 : start.attributeKey, start === null || start === void 0 ? void 0 : start.offset, end === null || end === void 0 ? void 0 : end.offset);
  };
  var undoManager = new yjs.UndoManager(typeScope, {
    trackedOrigins: new Set([identity])
  });
  var debugUndoWithStackSizes = function debugUndoWithStackSizes() {
    debugUndo.apply(void 0, arguments);
    debugUndo("stack size: undo ".concat(undoManager.undoStack.length, ", redo ").concat(undoManager.redoStack.length));
  };
  undoManager.on('stack-item-added', function (event) {
    var selection = getSelection();
    event.stackItem.meta.set('caret-location', selection);
    debugUndoWithStackSizes("".concat(event.type, " stack item added with selection"), selection);
  });
  undoManager.on('stack-item-popped', function (event) {
    if (event.type === 'undo' && undoManager.undoStack.length === 0) {
      debugUndoWithStackSizes("undo stack item popped (last item, no caret position to restore)");
      return;
    }
    var selection = event.stackItem.meta.get('caret-location');
    if (selection !== null && selection !== void 0 && selection.start) {
      setSelection(selection);
      debugUndoWithStackSizes("".concat(event.type, " stack item popped with selection"), selection);
      return;
    }
    debugUndoWithStackSizes("".concat(event.type, " stack item popped without selection"));
  });
  dispatch('isolated/editor').setUndoManager(undoManager);
  debugUndo('instantiated UndoManager');
}
//# sourceMappingURL=yjs-undo.js.map