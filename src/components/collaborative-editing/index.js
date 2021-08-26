/**
 * Internal dependencies
 */
import useYjs from './use-yjs';

function CollaborativeEditing( { settings } ) {
	useYjs( {
		settings: settings.collab,
	} );

	return null;
}

export default CollaborativeEditing;
