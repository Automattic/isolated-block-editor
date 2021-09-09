/**
 * External dependencies
 */
import { diffChars } from 'diff';

/**
 * Determine the position my caret should be at, after a peer modifies
 * the content in which my caret is contatined.
 *
 * To match the position notation in Gutenberg, HTML tags are ignored.
 * See unit tests for examples of what should happen.
 *
 * @param {string} oldText
 * @param {string} newText
 * @param {number} position Index-based position of the caret in oldText
 */
export function calculateNewPosition( oldText, newText, position ) {
	let cur = 0;
	let offset = 0;
	const changes = diffChars( stripHTML( oldText ), stripHTML( newText ) );

	for ( const { count, added, removed } of changes ) {
		if ( ! added && ! removed ) {
			cur += count;
		}
		if ( cur >= position ) {
			break;
		}

		if ( added ) {
			offset += count;
		}
		if ( removed ) {
			offset -= count;
		}
	}

	return offset + position;
}

/**
 * @param {string} html
 */
function stripHTML( html ) {
	const document = new window.DOMParser().parseFromString( html, 'text/html' );
	return document.body.textContent || '';
}
