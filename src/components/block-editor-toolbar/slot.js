/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { Fill, Slot } = createSlotFill( 'IsolatedToolbar' );

const ToolbarSlot = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

ToolbarSlot.Slot = function ( props ) {
	return <Slot>{ ( fills ) => fills }</Slot>;
};

export default ToolbarSlot;
