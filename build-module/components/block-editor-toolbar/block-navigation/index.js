import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { listView } from '@wordpress/icons';
import { store as blockEditorStore, __experimentalListView as ListView } from '@wordpress/block-editor';
import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import './style.scss';

function BlockNavigationDropdown(_ref, ref) {
  let {
    isDisabled,
    ...props
  } = _ref;
  const hasBlocks = useSelect(select => !!select(blockEditorStore).getBlockCount(), []);
  const isEnabled = hasBlocks && !isDisabled;
  return createElement(Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    position: "bottom right",
    renderToggle: _ref2 => {
      let {
        isOpen,
        onToggle
      } = _ref2;
      return createElement(Button, _extends({}, props, {
        ref: ref,
        icon: listView,
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        onClick: isEnabled ? onToggle : undefined
        /* translators: button label text should, if possible, be under 16 characters. */
        ,
        label: __('List view'),
        className: "block-editor-block-navigation",
        "aria-disabled": !isEnabled
      }));
    },
    renderContent: () => createElement("div", {
      className: "block-editor-block-navigation__container"
    }, createElement("p", {
      className: "block-editor-block-navigation__label"
    }, __('List view')), createElement(ListView, null))
  });
}

export default forwardRef(BlockNavigationDropdown);
//# sourceMappingURL=index.js.map