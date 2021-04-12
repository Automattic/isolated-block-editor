/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { Fill, Slot } = createSlotFill( 'PluginDocumentSettingPanel' );

const DocumentSection = ( { children } ) => {
	return (
		<Fill>
			{ children }
		</Fill>
	);
};

DocumentSection.Slot = function ( props ) {
	return (
		<Slot>
			{ ( fills ) =>
				fills.length === 0 ? (
					<span className="block-editor-block-inspector__no-blocks">{ __( 'Nothing to display' ) }</span>
				) : (
					fills
				)
			}
		</Slot>
	);
};

export default DocumentSection;
