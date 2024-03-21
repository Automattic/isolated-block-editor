import { createElement, Fragment } from "react";
/**
 * WordPress dependencies
 */
import { DocumentOutline, WordCount, TimeToRead, CharacterCount } from '@wordpress/editor';
import { __experimentalText as Text } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default function ListViewOutline() {
  return createElement(Fragment, null, createElement("div", {
    className: "editor-list-view-sidebar__outline"
  }, createElement("div", null, createElement(Text, null, __('Characters:')), createElement(Text, null, createElement(CharacterCount, null))), createElement("div", null, createElement(Text, null, __('Words:')), createElement(WordCount, null)), createElement("div", null, createElement(Text, null, __('Time to read:')), createElement(TimeToRead, null))), createElement(DocumentOutline, null));
}
//# sourceMappingURL=list-view-outline.js.map