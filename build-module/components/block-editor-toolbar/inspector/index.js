import { createElement } from "react";
/**
 * WordPress dependencies
 */

import { ComplementaryArea } from '@wordpress/interface';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
function Inspector({
  button,
  onToggle
}) {
  function onOutside(ev) {
    if (ev.target.closest('.block-editor-block-inspector') === null && !ev.target.classList.contains('iso-inspector')) {
      onToggle(false);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
  return createElement(Popover, {
    position: "bottom left",
    className: "iso-inspector",
    anchor: button?.current,
    onFocusOutside: onOutside
  }, createElement(ComplementaryArea.Slot, {
    scope: "isolated/editor"
  }));
}
export default Inspector;
//# sourceMappingURL=index.js.map