import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */

import './style.scss';

function Inspector() {
  return createElement(Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, createElement(BlockInspector, null));
}

export default Inspector;
//# sourceMappingURL=index.js.map