// @ts-nocheck
/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { ToolbarItem, Button, Popover } from '@wordpress/components';
import { NavigableToolbar, __experimentalLibrary as Library, ToolSelector } from '@wordpress/block-editor';
import { plus, listView } from '@wordpress/icons';
import { useRef, useCallback } from '@wordpress/element';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';

/**
 * Internal dependencies
 */
import EditorHistoryRedo from './redo';
import EditorHistoryUndo from './undo';
import BlockNavigationDropdown from '../block-navigation';
import './style.scss';

const preventDefault = ( event ) => {
	event.preventDefault();
};

function HeaderToolbar( props ) {
	const inserterButton = useRef();
	const { setIsInserterOpened, setIsListViewOpened } = useDispatch( 'isolated/editor' );
	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const {
		fixedToolbar,
		isInserterEnabled,
		isTextModeEnabled,
		showIconLabels,
		previewDeviceType,
		isInserterOpened,
		isListViewOpen,
		listViewShortcut,
	} = useSelect( ( select ) => {
		const { hasInserterItems, getBlockRootClientId, getBlockSelectionEnd } = select( 'core/block-editor' );
		const { isListViewOpened } = select( 'isolated/editor' );
		// @ts-ignore
		const { getShortcutRepresentation } = select( keyboardShortcutsStore );

		return {
			// @ts-ignore
			fixedToolbar: select( 'isolated/editor' ).isFeatureActive( 'fixedToolbar' ),
			// This setting (richEditingEnabled) should not live in the block editor's setting.
			isInserterEnabled:
				// @ts-ignore
				select( 'isolated/editor' ).getEditorMode() === 'visual' &&
				// @ts-ignore
				select( 'core/editor' ).getEditorSettings().richEditingEnabled &&
				// @ts-ignore
				hasInserterItems( getBlockRootClientId( getBlockSelectionEnd() ) ),
			// @ts-ignore
			isListViewOpen: isListViewOpened(),
			// @ts-ignore
			isTextModeEnabled: select( 'isolated/editor' ).getEditorMode() === 'text',
			previewDeviceType: 'Desktop',
			// @ts-ignore
			isInserterOpened: select( 'isolated/editor' ).isInserterOpened(),
			showIconLabels: false, // Not implemented yet
			listViewShortcut: getShortcutRepresentation( 'core/edit-post/toggle-list-view' ),
		};
	}, [] );
	const isLargeViewport = useViewportMatch( 'medium' );
	const { inserter, navigation, undo, selectorTool } = props.settings.iso.toolbar;
	const inserterInSidebar = props.settings?.iso?.sidebar?.inserter || false;
	const displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || fixedToolbar;
	const toolbarAriaLabel = displayBlockToolbar
		? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
		__( 'Document and block tools' )
		: /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
		__( 'Document tools' );
	const openInserter = useCallback( () => {
		if ( isInserterOpened ) {
			// Focusing the inserter button closes the inserter popover
			// @ts-ignore
			setIsInserterOpened( false );
		} else {
			setIsInserterOpened( true );
		}
	}, [ isInserterOpened, setIsInserterOpened ] );

	const toggleListView = useCallback( () => setIsListViewOpened( !isListViewOpen ), [
		setIsListViewOpened,
		isListViewOpen,
	] );

	return (
		<NavigableToolbar className="editor-document-tools edit-post-header-toolbar" aria-label={ toolbarAriaLabel }>
			{ ( inserter || undo || navigation || selectorTool ) && (
				<div className="editor-document-tools__left edit-post-header-toolbar__left">
					{ inserter && (
						<ToolbarItem
							ref={ inserterButton }
							as={ Button }
							className="editor-document-tools__inserter-toggle"
							isPressed={ isInserterOpened }
							onMouseDown={ preventDefault }
							onClick={ openInserter }
							disabled={ !isInserterEnabled }
							isPrimary
							icon={ plus }
							/* translators: button label text should, if possible, be under 16
					characters. */
							label={ _x( 'Toggle block inserter', 'Generic label for block inserter button' ) }
							showTooltip={ !showIconLabels }
						/>
					) }

					{ isInserterOpened && !inserterInSidebar && (
						<Popover
							position="bottom right"
							onClose={ () => setIsInserterOpened( false ) }
							anchor={ inserterButton.current }
						>
							<Library
								showMostUsedBlocks={ false }
								showInserterHelpPanel
								onSelect={ () => {
									if ( isMobileViewport ) {
										setIsInserterOpened( false );
									}
								} }
							/>
						</Popover>
					) }

					{ selectorTool && <ToolSelector /> }
					{ undo && (
						<ToolbarItem
							as={ EditorHistoryUndo }
							showTooltip={ !showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
					) }
					{ undo && (
						<ToolbarItem
							as={ EditorHistoryRedo }
							showTooltip={ !showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
					) }
					{ navigation && !inserterInSidebar && (
						<ToolbarItem as={ BlockNavigationDropdown } isDisabled={ isTextModeEnabled } />
					) }
					{ navigation && inserterInSidebar && (
						<ToolbarItem
							as={ Button }
							className="edit-post-header-toolbar__list-view-toggle"
							icon={ listView }
							disabled={ isTextModeEnabled }
							isPressed={ isListViewOpen }
							/* translators: button label text should, if possible, be under 16 characters. */
							label={ __( 'List View' ) }
							onClick={ toggleListView }
							shortcut={ listViewShortcut }
							showTooltip={ !showIconLabels }
						/>
					) }
				</div>
			) }
		</NavigableToolbar>
	);
}

export default HeaderToolbar;
