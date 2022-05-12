/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { close } from '@wordpress/icons';
import { useViewportMatch, __experimentalUseDialog as useDialog } from '@wordpress/compose';

export default function InserterSidebar() {
	const { setIsInserterOpened } = useDispatch( 'isolated/editor' );
	const isMobileViewport = useViewportMatch( 'medium', '<' );
	// Note: focusOnMount not present in Gutenberg
	// @ts-ignore
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
	} );

	return (
		<div
			// @ts-ignore
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="edit-post-editor__inserter-panel"
		>
			<div className="edit-post-editor__inserter-panel-header">
				<Button icon={ close } onClick={ () => setIsInserterOpened( false ) } />
			</div>
			<div className="edit-post-editor__inserter-panel-content">
				<Library showMostUsedBlocks={ false } showInserterHelpPanel shouldFocusBlock={ isMobileViewport } />
			</div>
		</div>
	);
}
