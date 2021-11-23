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

function Inspector(props) {
  return createElement(Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, createElement(ComplementaryArea.Slot, {
    scope: "isolated/editor"
  }));
}

export default Inspector;
//# sourceMappingURL=index.js.map