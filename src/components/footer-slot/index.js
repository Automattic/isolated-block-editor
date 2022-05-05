/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'IsolatedFooter' );

const FooterSection = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

FooterSection.Slot = function( props ) {
	return <Slot>{ ( fills ) => fills }</Slot>;
};

export default FooterSection;
