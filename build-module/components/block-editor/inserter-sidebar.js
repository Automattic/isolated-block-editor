/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button, VisuallyHidden } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { close } from '@wordpress/icons';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function InserterSidebar() {
  const {
    setIsInserterOpened
  } = useDispatch('isolated/editor');
  const isMobileViewport = useViewportMatch('medium', '<');
  const TagName = !isMobileViewport ? VisuallyHidden : 'div';
  // Note: focusOnMount not present in Gutenberg
  // @ts-ignore
  const [inserterDialogRef, inserterDialogProps] = useDialog({
    onClose: () => setIsInserterOpened(false),
    // @ts-ignore copied from Gutenberg
    focusOnMount: null
  });
  return /*#__PURE__*/_jsxs("div", {
    // @ts-ignore
    ref: inserterDialogRef,
    ...inserterDialogProps,
    className: "edit-widgets-layout__inserter-panel",
    children: [/*#__PURE__*/_jsx(TagName, {
      className: "edit-widgets-layout__inserter-panel-header",
      children: /*#__PURE__*/_jsx(Button, {
        icon: close,
        onClick: () => setIsInserterOpened(false)
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "edit-widgets-layout__inserter-panel-content",
      children: /*#__PURE__*/_jsx(Library, {
        showMostUsedBlocks: false,
        showInserterHelpPanel: true,
        shouldFocusBlock: isMobileViewport,
        onClose: () => setIsInserterOpened(false)
      })
    })]
  });
}
//# sourceMappingURL=inserter-sidebar.js.map