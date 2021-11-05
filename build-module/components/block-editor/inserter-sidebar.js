import _extends from "@babel/runtime/helpers/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { close } from '@wordpress/icons';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';
export default function InserterSidebar() {
  const {
    setIsInserterOpened
  } = useDispatch('isolated/editor');
  const isMobileViewport = useViewportMatch('medium', '<');
  const [inserterDialogRef, inserterDialogProps] = useDialog({
    onClose: () => setIsInserterOpened(false)
  });
  return createElement("div", _extends({
    ref: inserterDialogRef
  }, inserterDialogProps, {
    className: "edit-post-editor__inserter-panel"
  }), createElement("div", {
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