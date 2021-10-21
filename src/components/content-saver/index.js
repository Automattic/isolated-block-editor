/**
 * WordPress dependencies
 */

import { useEffect, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { serialize } from '@wordpress/blocks';

/** @typedef {import('../../index').OnSaveBlocks} OnSaveBlocks */
/** @typedef {import('../../index').OnSaveContent} OnSaveContent */

/**
 * Content saver
 * @param {object} props - Component props
 * @param {OnSaveBlocks} [props.onSaveBlocks] - Save blocks callback
 * @param {OnSaveContent} [props.onSaveContent] - Save content callback
 */
function ContentSaver( props ) {
	const { onSaveBlocks, onSaveContent } = props;
	const firstTime = useRef( true );
	const { setReady } = useDispatch( 'isolated/editor' );
	const { blocks, ignoredContent } = useSelect(
		( select ) => ( {
			blocks: select( 'isolated/editor' ).getBlocks(),
			ignoredContent: select( 'isolated/editor' ).getIgnoredContent(),
		} ),
		[]
	);

	function saveBlocks() {
		// Save the content in the format wanted by the user
		onSaveBlocks && onSaveBlocks( blocks, ignoredContent );
		onSaveContent && onSaveContent( serialize( blocks ) );
	}

	useEffect( () => {
		if ( ! blocks ) {
			setReady( true );
			return;
		}

		// Try and avoid an initial first save if no content
		if ( firstTime.current ) {
			firstTime.current = false;
			setReady( true );

			// The editor has initial content - save it
			if ( blocks && blocks.length > 1 ) {
				saveBlocks();
			}
		} else {
			saveBlocks();
		}
	}, [ blocks ] );

	return null;
}

export default ContentSaver;
