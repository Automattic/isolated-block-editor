import { remove } from '@wordpress/dom';

/**
 * Strips scripts and on* attributes from HTML.
 *
 * Slightly modified version of wp.dom.safeHTML() that only alters the
 * HTML if it actually finds nodes/attributes to remove. This is so we can leave
 * invalid HTML intact, for example if a user is still in the middle of typing the HTML string.
 *
 * @param {string} html HTML to sanitize.
 *
 * @return {string} The sanitized HTML.
 */
export default function sanitizeHTML( html ) {
	const { body } = document.implementation.createHTMLDocument( '' );
	body.innerHTML = html;
	const elements = body.getElementsByTagName( '*' );
	let elementIndex = elements.length;
	let found = 0;

	while ( elementIndex-- ) {
		const element = elements[ elementIndex ];

		if ( element.tagName === 'SCRIPT' ) {
			found++;
			remove( element );
		} else {
			let attributeIndex = element.attributes.length;

			while ( attributeIndex-- ) {
				const { name: key } = element.attributes[ attributeIndex ];

				if ( key.startsWith( 'on' ) ) {
					found++;
					element.removeAttribute( key );
				}
			}
		}
	}

	return found ? body.innerHTML : html;
}
