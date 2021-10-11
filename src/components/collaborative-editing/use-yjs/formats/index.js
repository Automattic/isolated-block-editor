/**
 * Internal dependencies
 */
import { registerFormatCollabCaret, FORMAT_NAME as CARET_FORMAT_NAME } from './collab-caret';

export const registerCollabFormats = ( getFormatType ) => {
	if ( ! getFormatType( CARET_FORMAT_NAME ) ) {
		registerFormatCollabCaret();
	}
};
