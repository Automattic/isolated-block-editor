import MarkdownIt from 'markdown-it';

/**
 * Initial content loader. Determine if the textarea contains blocks or raw HTML
 * @param {string} content Text area content
 * @param {*} parser Gutenberg `parse` function
 * @param {*} rawHandler Gutenberg `rawHandler` function
 */
function loadContent( content, parser, rawHandler ) {
	// Does the content contain blocks?
	if ( content.indexOf( '<!--' ) !== -1 ) {
		// Parse the blocks
		return parser( content );
	}

	const md = new MarkdownIt();

	// Raw HTML - do our best
	return rawHandler( { HTML: md.render( content ) } );
}

export default loadContent;
