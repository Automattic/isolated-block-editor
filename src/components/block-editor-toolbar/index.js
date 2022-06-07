/**
 * WordPress dependencies
 */

import { useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { cog } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import MoreMenu from './more-menu';
import HeaderToolbar from './header-toolbar';
import Inspector from './inspector';
import ToolbarSlot from './slot';
import './style.scss';

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnMore} OnMore */
/** @typedef {import('../../index').OnUndo} OnUndo */
/** @typedef {import('../../index').OnRedo} OnRedo */

/**
 * Block editor toolbar
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnUndo} props.onUndo - Undo callback
 * @param {OnRedo} props.onRedo - Redo callback
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
const BlockEditorToolbar = ( props ) => {
	const { settings, editorMode, renderMoreMenu, onUndo, onRedo } = props;
	const isHugeViewport = useViewportMatch( 'huge', '>=' );
	const { inspector, documentInspector } = settings.iso?.toolbar || {};
	const { moreMenu } = settings.iso || {};
	const inspectorInSidebar = settings?.iso?.sidebar?.inspector || false;
	const { openGeneralSidebar, closeGeneralSidebar } = useDispatch( 'isolated/editor' );
	const { setIsInserterOpened } = useDispatch( 'isolated/editor' );
	const { isEditorSidebarOpened, isBlockSelected, hasBlockSelected, isInserterOpened, isEditing } = useSelect(
		( select ) => ( {
			isEditing: select( 'isolated/editor' ),
			isEditorSidebarOpened: select( 'isolated/editor' ).isEditorSidebarOpened(),
			isBlockSelected: !! select( 'core/block-editor' ).getBlockSelectionStart(),
			hasBlockSelected: !! select( 'core/block-editor' ).getBlockSelectionStart(),
			isInserterOpened: select( 'isolated/editor' ).isInserterOpened(),
		} ),
		[]
	);

	function toggleSidebar() {
		if ( isEditorSidebarOpened ) {
			closeGeneralSidebar();
		} else {
			openGeneralSidebar( hasBlockSelected ? 'edit-post/block' : 'edit-post/document' );
		}
	}

	// If in popover mode then ensure the sidebar is closed when the editor is first started. This is because the complimentary area status
	// is saved to localStorage, and it might have been left open when in sidebar mode.
	useEffect( () => {
		if ( ! inspectorInSidebar ) {
			closeGeneralSidebar();
		}
	}, [] );

	useEffect( () => {
		// Close the block inspector when no block is selected. Gutenberg gets a bit crashy otherwise
		if ( ! inspectorInSidebar && ! isEditing && ! isBlockSelected && isEditorSidebarOpened ) {
			closeGeneralSidebar();
		}
	}, [ isEditing ] );

	// Inserter and Sidebars are mutually exclusive
	useEffect( () => {
		if ( isEditorSidebarOpened && ! isHugeViewport ) {
			setIsInserterOpened( false );
		}
	}, [ isEditorSidebarOpened, isHugeViewport ] );
	useEffect( () => {
		if ( isInserterOpened && ( ! isHugeViewport || ! inspectorInSidebar ) ) {
			closeGeneralSidebar();
		}
	}, [ isInserterOpened, isHugeViewport ] );

	return (
		<div className="edit-post-editor-regions__header" role="region" tabIndex={ -1 }>
			<div className="edit-post-header">
				<div className="edit-post-header__toolbar">
					<HeaderToolbar onUndo={ onUndo } onRedo={ onRedo } settings={ settings } />
				</div>

				<div className="edit-post-header__settings">
					<ToolbarSlot.Slot />

					{ inspector && (
						<Button
							icon={ cog }
							label={ __( 'Settings' ) }
							onClick={ toggleSidebar }
							isPressed={ isEditorSidebarOpened }
							aria-expanded={ isEditorSidebarOpened }
							disabled={ editorMode === 'text' }
						/>
					) }

					{ isEditorSidebarOpened && ! inspectorInSidebar && (
						<Inspector documentInspector={ documentInspector } blockSelected={ isBlockSelected } />
					) }

					{ moreMenu && (
						<MoreMenu
							settings={ settings }
							onClick={ () => closeGeneralSidebar() }
							renderMoreMenu={ renderMoreMenu }
						/>
					) }
				</div>
			</div>
		</div>
	);
};

export default BlockEditorToolbar;
