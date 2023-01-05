import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';
import { undo as undoIcon } from '@wordpress/icons';
import { forwardRef } from '@wordpress/element';
function EditorHistoryUndo(props, ref) {
  // @ts-ignore
  const hasUndo = useSelect(select => select('isolated/editor').hasEditorUndo(), []);
  const {
    undo
  } = useDispatch('isolated/editor');
  return createElement(Button, _extends({}, props, {
    ref: ref,
    icon: undoIcon,
    label: __('Undo'),
    shortcut: displayShortcut.primary('z')
    // If there are no undo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasUndo,
    onClick: hasUndo ? undo : undefined,
    className: "editor-history__undo"
  }));
}
export default forwardRef(EditorHistoryUndo);
//# sourceMappingURL=undo.js.map