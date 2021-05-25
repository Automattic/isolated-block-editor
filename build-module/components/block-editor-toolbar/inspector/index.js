import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */

import InspectorHeader from './header';
import Document from '../../document';
import './style.scss';

function Inspector(props) {
  const {
    documentInspector,
    blockSelected
  } = props;
  const [currentTab, setCurrentTab] = useState(blockSelected || !documentInspector ? 'block' : 'document');
  return createElement(Popover, {
    position: "bottom",
    className: "iso-inspector"
  }, documentInspector && createElement(InspectorHeader, {
    setTab: setCurrentTab,
    currentTab: currentTab,
    documentTitle: documentInspector
  }), currentTab === 'block' && createElement(BlockInspector, null), currentTab === 'document' && createElement(Document.Slot, null));
}

export default Inspector;
//# sourceMappingURL=index.js.map