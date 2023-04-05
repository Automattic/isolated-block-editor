"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _element = require("@wordpress/element");
var _data = require("@wordpress/data");
/**
 * WordPress dependencies
 */

/**
 * @callback OnLoad
 */
/**
 * Used by clients to add an optional loading placeholder
 *
 * @param {Object} props - Component props
 * @param {OnLoad} [props.onLoaded] - Callback to signal that the editor has loaded
 * @param {OnLoad} [props.onLoading] - Callback to signal that the editor is loading
 */
function EditorLoaded(_ref) {
  var onLoaded = _ref.onLoaded,
    onLoading = _ref.onLoading;
  var _useSelect = (0, _data.useSelect)(function (select) {
      return {
        // @ts-ignore
        isEditorReady: select('isolated/editor').isEditorReady()
      };
    }, []),
    isEditorReady = _useSelect.isEditorReady;
  (0, _element.useEffect)(function () {
    if (isEditorReady) {
      onLoaded && onLoaded();
    } else {
      onLoading && onLoading();
    }
  }, [isEditorReady]);
  return null;
}
var _default = EditorLoaded;
exports["default"] = _default;
//# sourceMappingURL=index.js.map