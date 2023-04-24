// @ts-nocheck
/**
 * WordPress dependencies
 */
import { BlockInspector, store as blockEditorStore } from '@wordpress/block-editor';
import { cog } from '@wordpress/icons';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { store as interfaceStore } from '@wordpress/interface';
import { Button, Panel, Slot, Fill } from '@wordpress/components';

/**
 * Internal dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import SettingsHeader from './sidebar-heading';
import Document from '../document';
import ComplementaryArea from '../complementary-area';

function isActiveArea( area ) {
	return [ 'edit-post/document', 'edit-post/block' ].includes( area )
}

const SettingsSidebar = ( { documentInspector } ) => {
	const { sidebarName, keyboardShortcut } = useSelect( ( select ) => {
		let sidebar = select( interfaceStore ).getActiveComplementaryArea( 'isolated/editor' );

		if ( !isActiveArea( sidebar ) ) {
			sidebar = 'edit-post/document';

			if ( select( blockEditorStore ).getBlockSelectionStart() ) {
				sidebar = 'edit-post/block';
			}
		}

		const shortcut = select( keyboardShortcutsStore ).getShortcutRepresentation( 'core/edit-post/toggle-sidebar' );
		return {
			sidebarName: sidebar,
			keyboardShortcut: shortcut,
		};
	}, [] );

	return (
		<ComplementaryArea
			className="iso-sidebar"
			identifier={ sidebarName }
			header={ <SettingsHeader sidebarName={ sidebarName } documentInspector={ documentInspector } /> }
			closeLabel={ __( 'Close settings' ) }
			headerClassName="edit-post-sidebar__panel-tabs"
			/* translators: button label text should, if possible, be under 16 characters. */
			title={ __( 'Settings' ) }
			toggleShortcut={ keyboardShortcut }
			icon={ cog }
			isActiveByDefault={ false }
		>
			{ sidebarName === 'edit-post/document' && <Document.Slot /> }
			{ sidebarName === 'edit-post/block' && <BlockInspector /> }
		</ComplementaryArea>
	);
};

export default SettingsSidebar;
