/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __, _x, sprintf } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */

const SettingsHeader = ( { sidebarName, documentInspector } ) => {
	const { openGeneralSidebar } = useDispatch( 'isolated/editor' );
	const openDocumentSettings = () => openGeneralSidebar( 'edit-post/document' );
	const openBlockSettings = () => openGeneralSidebar( 'edit-post/block' );

	const { documentLabel } = useSelect( ( select ) => {
		const hasCustomLabel = documentInspector && typeof documentInspector === 'string';
		return {
			// translators: Default label for the Document sidebar tab, not selected.
			documentLabel: hasCustomLabel ? documentInspector : _x( 'Document', 'noun' ),
		};
	}, [] );

	const [ documentAriaLabel, documentActiveClass ] =
		sidebarName === 'edit-post/document'
			? // translators: ARIA label for the Document sidebar tab, selected. %s: Document label.
			  [ sprintf( __( '%s (selected)' ), documentLabel ), 'is-active' ]
			: [ documentLabel, '' ];

	const [ blockAriaLabel, blockActiveClass ] =
		sidebarName === 'edit-post/block'
			? // translators: ARIA label for the Block Settings Sidebar tab, selected.
			  [ __( 'Block (selected)' ), 'is-active' ]
			: // translators: ARIA label for the Block Settings Sidebar tab, not selected.
			  [ __( 'Block' ), '' ];

	/* Use a list so screen readers will announce how many tabs there are. */
	return (
		<ul>
			{ !!documentInspector && (
				<li>
					<Button
						onClick={ openDocumentSettings }
						className={ `edit-post-sidebar__panel-tab ${ documentActiveClass }` }
						aria-label={ documentAriaLabel }
						data-label={ documentLabel }
					>
						{ documentLabel }
					</Button>
				</li>
			) }

			<li>
				<Button
					onClick={ openBlockSettings }
					className={ `edit-post-sidebar__panel-tab ${ blockActiveClass }` }
					aria-label={ blockAriaLabel }
					// translators: Data label for the Block Settings Sidebar tab.
					data-label={ __( 'Block' ) }
				>
					{
						// translators: Text label for the Block Settings Sidebar tab.
						__( 'Block' )
					}
				</Button>
			</li>
		</ul>
	);
};

export default SettingsHeader;
