/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';

import './style.scss';

/**
 * Adds peer selected className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */
const addSelectionBorders = ( OriginalComponent ) => {
	return ( props ) => {
		const isSelected = useSelect(
			( select ) => {
				const peers = select( 'isolated/editor' ).getPeers();
				return Object.values( peers ).some(
					( peer ) => peer.start?.clientId === props.clientId && peer.end?.clientId === props.clientId
				);
			},
			[ props.clientId ]
		);
		return (
			<OriginalComponent
				{ ...props }
				className={ isSelected ? 'is-iso-editor-collab-peer-selected' : undefined }
			/>
		);
	};
};

export const addFilterCollabBlockSelection = () => {
	addFilter( 'editor.BlockListBlock', 'isolated-block-editor', addSelectionBorders );
};
