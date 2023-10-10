/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { Fill, Slot } = createSlotFill( 'PluginDocumentSettingPanel' );

const DocumentSection = ( { children } ) => {
	return <Fill>{ children }</Fill>;
};

DocumentSection.Slot = function ( props ) {
	return (
		<Slot>
			{ ( fills ) =>
				fills ? (
					fills
				) : (
					<span className="block-editor-block-inspector__no-blocks">{ __( 'Nothing to display' ) }</span>
				)
			}
		</Slot>
	);
};

export default DocumentSection;
