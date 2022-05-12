/**
 * WordPress dependencies
 */

import { serialize } from '@wordpress/blocks';

/**
 * Override the default `core/editor` store with functions that return data from `core/block-editor` instead of the post in `core/editor`
 *
 * @param existingSelectors
 * @param newSelect
 */
export default function ( existingSelectors, newSelect ) {
	return {
		getEditedPostAttribute: ( state, attributeName ) => {
			if ( attributeName === 'content' ) {
				// Content is stored in core/block-editor, not in the post entity
				return serialize( newSelect( 'core/block-editor' ).getBlocks() );
			}

			// Pass everything else through
			return existingSelectors.getEditedPostAttribute( state, attributeName );
		},
		getEditedPostContent: () => {
			return serialize( newSelect( 'core/block-editor' ).getBlocks() );
		},
	};
}
