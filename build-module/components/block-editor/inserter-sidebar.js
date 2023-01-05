import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button, VisuallyHidden } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { close } from '@wordpress/icons';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';
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
  return createElement("div", _extends({
    // @ts-ignore
    ref: inserterDialogRef
  }, inserterDialogProps, {
    className: "edit-post-editor__inserter-panel"
  }), createElement(TagName, {
    className: "edit-post-editor__inserter-panel-header"
  }, createElement(Button, {
    icon: close,
    onClick: () => setIsInserterOpened(false)
  })), createElement("div", {
    className: "edit-post-editor__inserter-panel-content"
  }, createElement(Library, {
    showMostUsedBlocks: false,
    showInserterHelpPanel: true,
    shouldFocusBlock: isMobileViewport
  })));
}
//# sourceMappingURL=inserter-sidebar.js.map