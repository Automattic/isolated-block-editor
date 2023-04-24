/**
 * WordPress dependencies
 */
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { store as interfaceStore } from '@wordpress/interface';
import { Panel, Slot, Fill } from '@wordpress/components';

/**
 * Internal dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

import ComplementaryAreaHeader from './complementary-area-header';

function isActiveArea( area ) {
	return [ 'edit-post/document', 'edit-post/block' ].includes( area )
}

function ComplementaryAreaSlot( { scope, ...props } ) {
	return <Slot name={ `ComplementaryArea/${ scope }` } { ...props } />;
}

function ComplementaryAreaFill( { scope, children, className } ) {
	return (
		<Fill name={ `ComplementaryArea/${ scope }` }>
			<div className={ className }>{ children }</div>
		</Fill>
	);
}

export default function ComplementaryArea( { className, children, header, headerClassName, toggleShortcut, closeLabel, title, identifier, ...props } ) {
	const { enableComplementaryArea, disableComplementaryArea } = useDispatch( interfaceStore );
	const scope = "isolated/editor";
	const { postTitle, showIconLabels, isActive } = useSelect( ( select ) => {
		const { getActiveComplementaryArea, isItemPinned } =
			select( interfaceStore );
		const _activeArea = getActiveComplementaryArea( 'isolated/editor' );

		return {
			postTitle: '',
			showIconLabels: select( 'isolated/editor' ).isFeatureActive( 'showIconLabels' ),
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
				closeLabel={ closeLabel }
				onClose={ () => disableComplementaryArea( scope ) }
				smallScreenTitle={ postTitle || __( '(no title)' ) }
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