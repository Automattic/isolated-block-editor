import { createElement, Fragment } from "react";
/**
 * WordPress dependencies
 */
import { useRefEffect, useMergeRefs } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

import { BlockList, EditorStyles, Iframe, WritingFlow } from '@wordpress/block-editor';
export function useBlockSelectionClearer() {
  const {
    getSettings,
    hasSelectedBlock,
    hasMultiSelection
  } = useSelect(blockEditorStore, []);
  const {
    clearSelectedBlock
  } = useDispatch(blockEditorStore);
  const {
    clearBlockSelection: isEnabled
  } = getSettings();
  return useRefEffect(node => {
    if (!isEnabled) {
      return;
    }
    function onMouseDown(event) {
      if (!hasSelectedBlock() && !hasMultiSelection()) {
        return;
      }

      // Only handle clicks on the element, not the children.
      if (event.target !== node) {
        return;
      }
      clearSelectedBlock();
    }
    node.addEventListener('mousedown', onMouseDown);
    return () => {
      node.removeEventListener('mousedown', onMouseDown);
    };
  }, [hasSelectedBlock, hasMultiSelection, clearSelectedBlock, isEnabled]);
}
function useMouseMoveTypingReset() {
  const isTyping = useSelect(select => select(blockEditorStore).isTyping(), []);
  const {
    stopTyping
  } = useDispatch(blockEditorStore);
  return useRefEffect(node => {
    if (!isTyping) {
      return;
    }
    const {
      ownerDocument
    } = node;
    let lastClientX;
    let lastClientY;

    /**
     * On mouse move, unset typing flag if user has moved cursor.
     *
     * @param {MouseEvent} event Mousemove event.
     */
    function stopTypingOnMouseMove(event) {
      const {
        clientX,
        clientY
      } = event;

      // We need to check that the mouse really moved because Safari
      // triggers mousemove events when shift or ctrl are pressed.
      if (lastClientX && lastClientY && (lastClientX !== clientX || lastClientY !== clientY)) {
        stopTyping();
      }
      lastClientX = clientX;
      lastClientY = clientY;
    }
    ownerDocument.addEventListener('mousemove', stopTypingOnMouseMove);
    return () => {
      ownerDocument.removeEventListener('mousemove', stopTypingOnMouseMove);
    };
  }, [isTyping, stopTyping]);
}
export default function BlockCanvas({
  shouldIframe = true,
  height = '300px',
  children = createElement(BlockList, null),
  styles,
  contentRef: contentRefProp,
  iframeProps
}) {
  const resetTypingRef = useMouseMoveTypingReset();
  const clearerRef = useBlockSelectionClearer();
  const contentRef = useMergeRefs([contentRefProp, clearerRef]);
  if (!shouldIframe) {
    console.log(styles);
    return createElement(Fragment, null, createElement(EditorStyles, {
      styles: styles,
      scope: ".editor-styles-wrapper"
    }), createElement(WritingFlow, {
      ref: contentRef,
      className: "editor-styles-wrapper",
      tabIndex: -1,
      style: {
        height
      }
    }, children));
  }
  return createElement(Iframe, {
    ...iframeProps,
    ref: resetTypingRef,
    contentRef: contentRef,
    style: {
      width: '100%',
      height,
      ...iframeProps?.style
    },
    name: "editor-canvas"
  }, createElement(EditorStyles, {
    styles: styles
  }), children);
}
//# sourceMappingURL=block-canvas.js.map