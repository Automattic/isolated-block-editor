/**
 * WordPress dependencies
 */
import { store as interfaceStore } from '@wordpress/interface';
import { Panel, Fill } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useSelect } from '@wordpress/data';

import ComplementaryAreaHeader from './complementary-area-header';

function isActiveArea( area ) {
	return [ 'edit-post/document', 'edit-post/block' ].includes( area )
}

function ComplementaryAreaFill( { scope, children, className } ) {
	return (
		<Fill name={ `ComplementaryArea/${ scope }` }>
			<div className={ className }>{ children }</div>
		</Fill>
	);
}

export default function ComplementaryArea( { className, children, header, headerClassName, toggleShortcut, closeLabel, title, identifier, ...props } ) {
	const scope = "isolated/editor";
	const { isActive } = useSelect( ( select ) => {
		// @ts-ignore
		const { getActiveComplementaryArea } = select( interfaceStore );
		const _activeArea = getActiveComplementaryArea( 'isolated/editor' );

		return {
			isActive: isActiveArea( _activeArea ),
		};
	}, [] );

	if ( !isActive ) {
		return null;
	}

	return (
		<ComplementaryAreaFill
			className="interface-complementary-area"
			scope="isolated/editor"
		>
			<ComplementaryAreaHeader
				className={ headerClassName }
				toggleButtonProps={ {
					label: closeLabel,
					shortcut: toggleShortcut,
					scope,
					identifier,
				} }
			>
				{ header }
			</ComplementaryAreaHeader>
			<Panel className="edit-post-sidebar">{ children }</Panel>
		</ComplementaryAreaFill>
	);
}