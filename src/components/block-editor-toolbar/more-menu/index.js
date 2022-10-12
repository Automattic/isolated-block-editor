// @ts-nocheck
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';

/**
 * Internal dependencies
 */

import WritingMenu from './writing-menu';
import EditorMenu from './editor-menu';
import LinkMenu from './link-menu';

/** @typedef {import('../../../index').BlockEditorSettings} BlockEditorSettings */

/**
 * Close dropdown callback
 *
 * @callback OnClose
 */

/**
 * More menu render callback
 *
 * @callback OnMore
 * @param {BlockEditorSettings} settings - Settings
 * @param {OnClose} onClose - Callback to close the menu
 */

const POPOVER_PROPS = {
	className: 'edit-post-more-menu__content',
	position: 'bottom left',
};
const TOGGLE_PROPS = {
	tooltipPosition: 'bottom',
};

/**
 * More menu
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnClose} props.onClick
 * @param {OnMore} props.renderMoreMenu
 */
const MoreMenu = ( { settings, onClick, renderMoreMenu } ) => (
	<DropdownMenu
		className="edit-post-more-menu"
		icon={ moreVertical }
		label={ __( 'More tools & options' ) }
		popoverProps={ POPOVER_PROPS }
		toggleProps={ { ...TOGGLE_PROPS, onClick } }
	>
		{ ( { onClose } ) => (
			<>
				{ renderMoreMenu && renderMoreMenu( settings, onClose ) }
				<EditorMenu onClose={ onClose } settings={ settings } />
				<WritingMenu onClose={ onClose } settings={ settings } />
				<LinkMenu settings={ settings } />
			</>
		) }
	</DropdownMenu>
);

export default MoreMenu;
