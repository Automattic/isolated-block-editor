/**
 * WordPress dependencies
 */

import { ComplementaryArea } from '@wordpress/interface';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';

function Inspector( { button, onToggle } ) {
	function onOutside( ev ) {
		if ( ev.target.closest( '.block-editor-block-inspector' ) === null ) {
			onToggle();
		}
	}

	return (
		<Popover position="bottom left" className="iso-inspector" anchorRef={ button } onFocusOutside={ onOutside }>
			<ComplementaryArea.Slot scope="isolated/editor" />
		</Popover>
	);
}

export default Inspector;
