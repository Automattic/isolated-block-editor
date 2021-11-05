import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalListView as ListView, store as blockEditorStore } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useFocusOnMount, useFocusReturn, useInstanceId, useMergeRefs } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { ESCAPE } from '@wordpress/keycodes';
export default function ListViewSidebar() {
  const {
    setIsListViewOpened
  } = useDispatch('isolated/editor');
  const {
    clearSelectedBlock,
    selectBlock
  } = useDispatch(blockEditorStore);

  async function selectEditorBlock(clientId) {
    await clearSelectedBlock();
    selectBlock(clientId, -1);
  }

  const focusOnMountRef = useFocusOnMount('firstElement');
  const focusReturnRef = useFocusReturn();

  function closeOnEscape(event) {
    if (event.keyCode === ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      setIsListViewOpened(false);
    }
  }

  const instanceId = useInstanceId(ListViewSidebar);
  const labelId = `edit-post-editor__list-view-panel-label-${instanceId}`;
  return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
    createElement("div", {
      "aria-labelledby": labelId,
      className: "edit-post-editor__list-view-panel",
      onKeyDown: closeOnEscape
    }, createElement("div", {
      className: "edit-post-editor__list-view-panel-header"
    }, createElement("strong", {
      id: labelId
    }, __('List view')), createElement(Button, {
      icon: closeSmall,
      label: __('Close list view sidebar'),
      onClick: () => setIsListViewOpened(false)
    })), createElement("div", {
      className: "edit-post-editor__list-view-panel-content",
      ref: useMergeRefs([focusReturnRef, focusOnMountRef])
    }, createElement(ListView, {
      onSelect: selectEditorBlock,
      showNestedBlocks: true,
      __experimentalPersistentListViewFeatures: true
    })))
  );
}
//# sourceMappingURL=listview-sidebar.js.map