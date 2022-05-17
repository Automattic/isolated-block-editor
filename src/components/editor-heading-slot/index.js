import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'IsolatedEditorHeading' );

const EditorHeading = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

EditorHeading.Slot = function ( props ) {
	return <Slot>{ ( fills ) => fills }</Slot>;
};

export default EditorHeading;