/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { Fill, Slot } = createSlotFill( 'IsolatedToolbar' );

/**
 * A Toolbar slot/fill
 *
 * @param {Object} props Component props
 * @param {Object} props.children Child components to insert in the toolbar slot
 * @return object
 */
const ToolbarSlot = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

ToolbarSlot.Slot = function ( props ) {
	return <Slot>{ ( fills ) => fills }</Slot>;
};

export default ToolbarSlot;
