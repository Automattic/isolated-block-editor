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
 * @param {Object} props - Component props
 * @param {OnLoad} [props.onLoaded] - Callback to signal that the editor has loaded
 * @param {OnLoad} [props.onLoading] - Callback to signal that the editor is loading
 */
function EditorLoaded(_ref) {
  let {
    onLoaded,
    onLoading
  } = _ref;
  const {
    isEditorReady
  } = useSelect(select => ({
    // @ts-ignore
    isEditorReady: select('isolated/editor').isEditorReady()
  }), []);
  useEffect(() => {
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