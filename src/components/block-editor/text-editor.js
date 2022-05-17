/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PostTextEditor from './post-text-editor';
import EditorHeading from '../editor-heading-slot';

/**
 * This is a copy of packages/edit-post/src/components/text-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 */
function TextEditor( {} ) {
	return (
		<div className="edit-post-text-editor">
			<div className="edit-post-text-editor__body">
				<EditorHeading.Slot mode="text" />
				<PostTextEditor />
			</div>
		</div>
	);
}

export default TextEditor;
