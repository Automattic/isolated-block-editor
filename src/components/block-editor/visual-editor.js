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
	ObserveTyping,
	__unstableUseBlockSelectionClearer as useBlockSelectionClearer,
	__unstableUseTypewriter as useTypewriter,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	__experimentalBlockSettingsMenuFirstItem,
	BlockTools,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
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
		useTypewriter(),
		useBlockSelectionClearer(),
		useTypingObserver(),
	] );

	return (
		<BlockTools __unstableContentRef={ ref } className="edit-post-visual-editor">
			<div className="editor-styles-wrapper" ref={ mergedRefs }>
				<WritingFlow>
					<ObserveTyping>
						<BlockList />
					</ObserveTyping>
				</WritingFlow>
			</div>
		</BlockTools>
	);
};

export default VisualEditor;
