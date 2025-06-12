/**
 * WordPress dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { listView } from '@wordpress/icons';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ListViewSidebar from '../../block-editor/listview-sidebar';
import './style.scss';
import { jsx as _jsx } from "react/jsx-runtime";
function BlockNavigationDropdown(props, ref) {
  const {
    isDisabled,
    ...rest
  } = props;
  const hasBlocks = useSelect(select => !!select(blockEditorStore).getBlockCount(), []);
  const isEnabled = hasBlocks && !isDisabled;
  return /*#__PURE__*/_jsx(Dropdown, {
    contentClassName: "block-editor-block-navigation__popover",
    position: "bottom right",
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/_jsx(Button, {
      ...rest,
      ref: ref,
      icon: listView,
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
      onClick: isEnabled ? onToggle : undefined
      /* translators: button label text should, if possible, be under 16 characters. */,
      label: __('List view'),
      className: "block-editor-block-navigation",
      "aria-disabled": !isEnabled
    }),
    renderContent: () => /*#__PURE__*/_jsx(ListViewSidebar, {
      canClose: false
    })
  });
}
export default forwardRef(BlockNavigationDropdown);
//# sourceMappingURL=index.js.map