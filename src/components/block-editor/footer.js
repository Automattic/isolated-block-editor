/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { BlockBreadcrumb } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */

import FooterSection from '../footer-slot';

const Footer = ( { editorMode } ) => {
	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const { showBlockBreadcrumbs, documentLabel } = useSelect( ( select ) => {
		// @ts-ignore
		const { getPostTypeLabel } = select( editorStore );
		const postTypeLabel = getPostTypeLabel();

		return {
			// TODO: This is currently disabled until it can be better worked in
			showBlockBreadcrumbs: false, //isFeatureActive( 'showBlockBreadcrumbs' ),
			// translators: Default label for the Document in the Block Breadcrumb.
			documentLabel: postTypeLabel || _x( 'Document', 'noun' ),
		};
	}, [] );

	return (
		<div className="edit-post-layout__footer">
			{ showBlockBreadcrumbs && ! isMobileViewport && editorMode === 'visual' && (
				<BlockBreadcrumb rootLabelText={ documentLabel } />
			) }

			<FooterSection.Slot />
		</div>
	);
};

export default Footer;
