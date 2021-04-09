import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
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
  var documentInspector = props.documentInspector,
      blockSelected = props.blockSelected;

  var _useState = useState(blockSelected || !documentInspector ? 'block' : 'document'),
      _useState2 = _slicedToArray(_useState, 2),
      currentTab = _useState2[0],
      setCurrentTab = _useState2[1];

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