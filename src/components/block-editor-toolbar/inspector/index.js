/**
 * WordPress dependencies
 */

import { BlockInspector } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import InspectorHeader from './header';
import Document from '../../document';
import './style.scss';

function Inspector( props ) {
	const { documentInspector, blockSelected } = props;
	const [ currentTab, setCurrentTab ] = useState( blockSelected || ! documentInspector ? 'block' : 'document' );

	return (
		<Popover position="bottom" className="iso-inspector">
			{ documentInspector && (
				<InspectorHeader
					setTab={ setCurrentTab }
					currentTab={ currentTab }
					documentTitle={ documentInspector }
				/>
			) }

			{ currentTab === 'block' && <BlockInspector /> }
			{ currentTab === 'document' && <Document.Slot /> }
		</Popover>
	);
}

export default Inspector;
