import TurndownService from 'turndown';

const turndown = new TurndownService( {
	bulletListMarker: '-',
} );

turndown.addRule( 'listItem', {
	filter: 'li',

	replacement: function ( content, node, options ) {
		content = content
			.replace( /^\n+/, '' ) // remove leading newlines
			.replace( /\n+$/, '\n' ) // replace trailing newlines with just a single one
			.replace( /\n/gm, '\n    ' ); // indent
		var prefix = options.bulletListMarker + ' ';
		var parent = node.parentNode;
		if ( parent.nodeName === 'OL' ) {
			var start = parent.getAttribute( 'start' );
			var index = Array.prototype.indexOf.call( parent.children, node );
			prefix = ( start ? Number( start ) + index : index + 1 ) + '. ';
		}
		return prefix + content + ( node.nextSibling && ! /\n$/.test( content ) ? '\n' : '' );
	},
} );

/**
 * Saves content to the textarea
 * @param {string} content Serialized block content
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
function saveContent( content, textarea ) {
	textarea.value = turndown.turndown( content ) + '\n';
}

export default saveContent;
