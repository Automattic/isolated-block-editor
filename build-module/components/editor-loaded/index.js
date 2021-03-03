/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
/**
 * @callback OnLoad
 */

/**
* Used by clients to add an optional loading placeholder
*
* @param {object} props - Component props
* @param {OnLoad} [props.onLoaded] - Callback to signal that the editor has loaded
* @param {OnLoad} [props.onLoading] - Callback to signal that the editor is loading
*/

function EditorLoaded(_ref) {
  var onLoaded = _ref.onLoaded,
      onLoading = _ref.onLoading;

  var _useSelect = useSelect(function (select) {
    return {
      isEditorReady: select('isolated/editor').isEditorReady()
    };
  }, []),
      isEditorReady = _useSelect.isEditorReady;

  useEffect(function () {
    if (isEditorReady) {
      onLoaded && onLoaded();
    } else {
      onLoading && onLoading();
    }
  }, [isEditorReady]);
  return null;
}

export default EditorLoaded;
//# sourceMappingURL=index.js.map