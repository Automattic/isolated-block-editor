/**
 * External dependencies
 */
import mergeRefs from 'react-merge-refs';
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
	__unstableUseScrollMultiSelectionIntoView as useScrollMultiSelectionIntoView,
	__experimentalBlockSettingsMenuFirstItem,
} from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { Popover } from '@wordpress/components';

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
const VisualEditor = () => {
	const ref = useRef();

	useScrollMultiSelectionIntoView( ref );
	useBlockSelectionClearer( ref );
	useTypewriter( ref );
	useClipboardHandler( ref );
	useTypingObserver( ref );

	return (
		<div className="edit-post-visual-editor">
			<Popover.Slot name="block-toolbar" />

			<div className="editor-styles-wrapper" ref={ ref }>
				<WritingFlow>
					<BlockList />
				</WritingFlow>
			</div>
		</div>
	);
};

export default VisualEditor;
