/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, createRef } from '@wordpress/element';

const InspectorHeader = ( { currentTab, setTab, documentTitle } ) => {
	const docRef = createRef();
	const blockRef = createRef();

	useEffect( () => {
		if ( currentTab === 'document' ) {
			docRef.current.focus();
		} else {
			blockRef.current.focus();
		}
	}, [] )

	return (
		<div className="components-panel__header interface-complementary-area-header edit-post-sidebar__panel-tabs">
			<ul>
				<li>
					<Button
						onClick={ () => setTab( 'document' ) }
						ref={ docRef }
						className={ classnames(
							'edit-post-sidebar__panel-tab',
							currentTab === 'document' && 'is-active'
						) }
					>
						{ documentTitle }
					</Button>
				</li>
				<li>
					<Button
						onClick={ () => setTab( 'block' ) }
						ref={ blockRef }
						className={ classnames(
							'edit-post-sidebar__panel-tab',
							currentTab === 'block' && 'is-active'
						) }
					>
						{
							// translators: Text label for the Block Settings Sidebar tab.
							__( 'Block' )
						}
					</Button>
				</li>
			</ul>
		</div>
	);
};

export default InspectorHeader;
