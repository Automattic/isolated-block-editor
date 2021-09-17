/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { ToolbarItem, Button, Popover } from '@wordpress/components';
import { NavigableToolbar, BlockNavigationDropdown, __experimentalLibrary as Library, ToolSelector } from '@wordpress/block-editor';
import { TableOfContents } from '@wordpress/editor';
import { plus } from '@wordpress/icons';
import { useRef, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import EditorHistoryRedo from './redo';
import EditorHistoryUndo from './undo';
import './style.scss';

const preventDefault = ( event ) => {
	event.preventDefault();
};

function HeaderToolbar( props ) {
	const inserterButton = useRef();
	const { setIsInserterOpened } = useDispatch( 'isolated/editor' );
	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const {
		hasFixedToolbar,
		hasPeers,
		isInserterEnabled,
		isTextModeEnabled,
		showIconLabels,
		previewDeviceType,
		isInserterOpened,
	} = useSelect( ( select ) => {
		const { hasInserterItems, getBlockRootClientId, getBlockSelectionEnd } = select( 'core/block-editor' );

		return {
			hasFixedToolbar: select( 'isolated/editor' ).isFeatureActive( 'fixedToolbar' ),
			hasPeers: select( 'isolated/editor' ).hasPeers(),
			// This setting (richEditingEnabled) should not live in the block editor's setting.
			isInserterEnabled:
				select( 'isolated/editor' ).getEditorMode() === 'visual' &&
				select( 'core/editor' ).getEditorSettings().richEditingEnabled &&
				hasInserterItems( getBlockRootClientId( getBlockSelectionEnd() ) ),
			isTextModeEnabled: select( 'isolated/editor' ).getEditorMode() === 'text',
			previewDeviceType: 'Desktop',
			isInserterOpened: select( 'isolated/editor' ).isInserterOpened(),
			showIconLabels: false, // Not implemented yet
		};
	}, [] );
	const isLargeViewport = useViewportMatch( 'medium' );
	const isWideViewport = useViewportMatch( 'wide' );
	const { inserter, toc, navigation, undo: undoSetting, selectorTool } = props.settings.iso.toolbar;
	const undo = undoSetting && ! hasPeers;
	const displayBlockToolbar = ! isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
	const toolbarAriaLabel = displayBlockToolbar
		? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
		  __( 'Document and block tools' )
		: /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
		  __( 'Document tools' );
	const openInserter = useCallback( () => {
		if ( isInserterOpened ) {
			// Focusing the inserter button closes the inserter popover
			inserterButton.current.focus();
		} else {
			setIsInserterOpened( true );
		}
	}, [ isInserterOpened, setIsInserterOpened ] );

	return (
		<NavigableToolbar className="edit-post-header-toolbar" aria-label={ toolbarAriaLabel }>
			{ ( inserter || undo || navigation || toc ) && (
				<div className="edit-post-header-toolbar__left">
					{ inserter && (
						<ToolbarItem
							ref={ inserterButton }
							as={ Button }
							className="edit-post-header-toolbar__inserter-toggle"
							isPressed={ isInserterOpened }
							onMouseDown={ preventDefault }
							onClick={ openInserter }
							disabled={ ! isInserterEnabled }
							isPrimary
							icon={ plus }
							/* translators: button label text should, if possible, be under 16
					characters. */
							label={ _x( 'Toggle block inserter', 'Generic label for block inserter button' ) }
							showTooltip={ ! showIconLabels }
						/>
					) }

					{ isInserterOpened && (
						<Popover
							position="bottom right"
							onClose={ () => setIsInserterOpened( false ) }
							anchorRef={ inserterButton.current }
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
							showTooltip={ ! showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
					) }
					{ undo && (
						<ToolbarItem
							as={ EditorHistoryRedo }
							showTooltip={ ! showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
					) }
					{ navigation && <ToolbarItem as={ BlockNavigationDropdown } isDisabled={ isTextModeEnabled } /> }
					{ toc && (
						<ToolbarItem
							as={ TableOfContents }
							hasOutlineItemsDisabled={ isTextModeEnabled }
							repositionDropdown={ showIconLabels && ! isWideViewport }
							showTooltip={ ! showIconLabels }
							variant={ showIconLabels ? 'tertiary' : undefined }
						/>
					) }
				</div>
			) }
		</NavigableToolbar>
	);
}

export default HeaderToolbar;
