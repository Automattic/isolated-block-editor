/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button, VisuallyHidden } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { close } from '@wordpress/icons';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';

export default function InserterSidebar() {
	const { setIsInserterOpened } = useDispatch( 'isolated/editor' );
	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const TagName = ! isMobileViewport ? VisuallyHidden : 'div';
	// Note: focusOnMount not present in Gutenberg
	// @ts-ignore
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
		focusOnMount: null,
	} );

	return (
		<div
			// @ts-ignore
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="edit-post-editor__inserter-panel"
		>
			<TagName className="edit-post-editor__inserter-panel-header">
				<Button icon={ close } onClick={ () => setIsInserterOpened( false ) } />
			</TagName>
			<div className="edit-post-editor__inserter-panel-content">
				<Library showMostUsedBlocks={ false } showInserterHelpPanel shouldFocusBlock={ isMobileViewport } />
			</div>
		</div>
	);
}
