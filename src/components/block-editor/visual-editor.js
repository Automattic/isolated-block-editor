/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import {
	BlockList,
	WritingFlow,
	__unstableUseBlockSelectionClearer as useBlockSelectionClearer,
	__unstableUseTypewriter as useTypewriter,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	__unstableUseCanvasClickRedirect as useCanvasClickRedirect,
	__experimentalBlockSettingsMenuFirstItem,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import { useMergeRefs } from '@wordpress/compose';

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
const VisualEditor = () => {
	const ref = useRef();

	const mergedRefs = useMergeRefs( [
		ref,
		useClipboardHandler(),
		useCanvasClickRedirect(),
		useTypewriter(),
		useBlockSelectionClearer(),
		useTypingObserver(),
	] );

	return (
		<div className="edit-post-visual-editor">
			<Popover.Slot name="block-toolbar" />

			<div className="editor-styles-wrapper" ref={ mergedRefs }>
				<WritingFlow>
					<BlockList />
				</WritingFlow>
			</div>
		</div>
	);
};

export default VisualEditor;
