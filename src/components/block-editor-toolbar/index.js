/**
 * WordPress dependencies
 */

import {	BlockToolbar } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';
import { cog, next, previous } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

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

/**
 * Block editor toolbar
 *
 * @param {Object} props - Component props
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
const BlockEditorToolbar = ( props ) => {
	const ref = useRef( null );
	const { settings, editorMode, renderMoreMenu } = props;
	const isHugeViewport = useViewportMatch( 'huge', '>=' );
	const blockToolbarRef = useRef();
	const isLargeViewport = useViewportMatch( 'medium' );
	const { inspector } = settings.iso?.toolbar || {};
	const { moreMenu } = settings.iso || {};
	const inspectorInSidebar = settings?.iso?.sidebar?.inspector || false;
	const { openGeneralSidebar, closeGeneralSidebar } = useDispatch( 'isolated/editor' );
	const { setIsInserterOpened } = useDispatch( 'isolated/editor' );
	const { isEditorSidebarOpened, isBlockSelected, hasBlockSelected, isInserterOpened, isEditing } = useSelect(
		( select ) => ( {
			isEditing: select( 'isolated/editor' ),
			// @ts-ignore
			isEditorSidebarOpened: select( 'isolated/editor' ).isEditorSidebarOpened(),
			// @ts-ignore
			isBlockSelected: !! select( 'core/block-editor' ).getBlockSelectionStart(),
			// @ts-ignore
			hasBlockSelected: !! select( 'core/block-editor' ).getBlockSelectionStart(),
			// @ts-ignore
			isInserterOpened: select( 'isolated/editor' ).isInserterOpened(),
		} ),
		[]
	);

	const [ isBlockToolsCollapsed, setIsBlockToolsCollapsed ] =
		useState( true );

	useEffect( () => {
		// If we have a new block selection, show the block tools
		if ( isBlockSelected ) {
			setIsBlockToolsCollapsed( false );
		}
	}, [ isBlockSelected ] );

	function toggleSidebar( isOpen ) {
		if ( ! isOpen ) {
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
					<HeaderToolbar settings={ settings } />
					{ isLargeViewport && (
						<>
							<div
								className={ classnames(
									'selected-block-tools-wrapper',
									{
										'is-collapsed': isBlockToolsCollapsed,
									}
								) }
							>
								<BlockToolbar hideDragHandle />
							</div>
							{
								// @ts-ignore
								<Popover.Slot
									ref={ blockToolbarRef }
									name="block-toolbar"
								/>
							}
							{ isBlockSelected && (
								<Button
									className="edit-post-header__block-tools-toggle"
									icon={ isBlockToolsCollapsed ? next : previous }
									onClick={ () => {
										setIsBlockToolsCollapsed(
											( collapsed ) => ! collapsed
										);
									} }
									label={
										isBlockToolsCollapsed
											? __( 'Show block tools' )
											: __( 'Hide block tools' )
									}
								/>
							) }
						</>
					) }
				</div>

				<div className="edit-post-header__settings" ref={ ref }>
					<ToolbarSlot.Slot />

					{ inspector && (
						<Button
							icon={ cog }
							label={ __( 'Settings' ) }
							onClick={ () => toggleSidebar( ! isEditorSidebarOpened ) }
							isPressed={ isEditorSidebarOpened }
							aria-expanded={ isEditorSidebarOpened }
							disabled={ editorMode === 'text' }
						/>
					) }

					{ isEditorSidebarOpened && ! inspectorInSidebar && (
						<Inspector button={ ref } onToggle={ toggleSidebar } />
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
