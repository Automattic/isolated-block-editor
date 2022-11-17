/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'IsolatedFooter' );

const ActionArea = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

ActionArea.Slot = function () {
	return <Slot>{ ( fills ) => fills }</Slot>;
};

export default ActionArea;
