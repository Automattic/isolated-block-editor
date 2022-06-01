import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { ComplementaryArea } from '@wordpress/interface';
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */

import './style.scss';

function Inspector(_ref) {
  let {
    button,
    onToggle
  } = _ref;

  function onOutside(ev) {
    if (ev.target.closest('.block-editor-block-inspector') === null) {
      onToggle();
    }
  }

  return createElement(Popover, {
    position: "bottom left",
    className: "iso-inspector",
    anchorRef: button,
    onFocusOutside: onOutside
  }, createElement(ComplementaryArea.Slot, {
    scope: "isolated/editor"
  }));
}

export default Inspector;
//# sourceMappingURL=index.js.map