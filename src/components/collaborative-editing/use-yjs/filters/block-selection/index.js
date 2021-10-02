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
		const { isSelected, color } = useSelect(
			( select ) => {
				const peers = select( 'isolated/editor' ).getPeers();
				const matchedPeer = Object.values( peers ).find(
					( peer ) => peer.start?.clientId === props.clientId && peer.end?.clientId === props.clientId
				);
				return {
					isSelected: !! matchedPeer,
					color: matchedPeer?.color,
				};
			},
			[ props.clientId ]
		);
		return (
			<OriginalComponent
				{ ...props }
				className={ isSelected ? 'is-iso-editor-collab-peer-selected' : undefined }
				wrapperProps={ {
					style: {
						'--iso-editor-collab-peer-block-color': color,
					},
				} }
			/>
		);
	};
};

export const addFilterCollabBlockSelection = () => {
	addFilter( 'editor.BlockListBlock', 'isolated-block-editor/collab', addSelectionBorders, 9 );
};
