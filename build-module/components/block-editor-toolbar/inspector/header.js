import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, createRef } from '@wordpress/element';

var InspectorHeader = function InspectorHeader(_ref) {
  var currentTab = _ref.currentTab,
      setTab = _ref.setTab,
      documentTitle = _ref.documentTitle;
  var docRef = createRef();
  var blockRef = createRef();
  useEffect(function () {
    if (currentTab === 'document') {
      docRef.current.focus();
    } else {
      blockRef.current.focus();
    }
  }, []);
  return createElement("div", {
    className: "components-panel__header interface-complementary-area-header edit-post-sidebar__panel-tabs"
  }, createElement("ul", null, createElement("li", null, createElement(Button, {
    onClick: function onClick() {
      return setTab('document');
    },
    ref: docRef,
    className: classnames('edit-post-sidebar__panel-tab', currentTab === 'document' && 'is-active')
  }, documentTitle)), createElement("li", null, createElement(Button, {
    onClick: function onClick() {
      return setTab('block');
    },
    ref: blockRef,
    className: classnames('edit-post-sidebar__panel-tab', currentTab === 'block' && 'is-active')
  }, // translators: Text label for the Block Settings Sidebar tab.
  __('Block')))));
};

export default InspectorHeader;
//# sourceMappingURL=header.js.map