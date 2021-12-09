/**
 * External dependencies
 */
import * as diff from 'lib0/diff';
import { isEqual } from 'lodash';

/** @typedef {import("yjs").XmlText} Y.XmlText */

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
import { create, __UNSTABLE_LINE_SEPARATOR } from '@wordpress/rich-text';

/**
 * Convert an array of Gutenberg RichText formats to an array of range-based Y.Text formats.
 *
 * @param {Object[]} formats
 * @returns {Object[]} Y.Text formats
 */
export function gutenFormatsToYFormats( formats ) {
	const findIndexOfEqualFormat = ( needle, haystack = [] ) => haystack.findIndex( ( f ) => needle === f );
	const visited = Array( formats.length )
		.fill( null )
		.map( () => ( {} ) );
	const yFormats = [];

	formats.forEach( ( formatsForChar, charIdx ) => {
		formatsForChar.forEach( ( f, fIdx ) => {
			if ( visited[ charIdx ][ fIdx ] ) return;

			let fLength = 1;

			for ( let ci = charIdx + 1; ci < formats.length; ci++ ) {
				const foundIndex = findIndexOfEqualFormat( f, formats[ ci ] );
				if ( foundIndex === -1 ) break;

				visited[ ci ][ foundIndex ] = true;
				fLength++;
			}

			yFormats.push( {
				format: namedGutenFormatToStandardTags( f ),
				index: charIdx,
				length: fLength,
			} );
		} );
	} );

	return yFormats;
}

/**
 * Converts registered formats back to their standard tag/attribute names.
 *
 * For example, `core/bold` will be converted back to `strong`.
 */
export function namedGutenFormatToStandardTags( format ) {
	const { tagName, attributes = {} } = select( 'core/rich-text' ).getFormatType( format.type );
	if ( ! format.attributes ) return { [ tagName ]: true };

	const remappedEntries = Object.entries( format.attributes ).map( ( [ key, value ] ) => [
		attributes[ key ],
		value,
	] );
	return { [ tagName ]: Object.fromEntries( remappedEntries ) };
}

/**
 * Apply the delta between two HTML strings to a Y.XmlText.
 *
 * @param {string} htmlA
 * @param {string} htmlB
 * @param {Y.XmlText} yxmlText
 * @param {Object} [richTextOpts] Optional options object to pass @wordpress/rich-text create().
 */
export function applyHTMLDelta( htmlA, htmlB, yxmlText, richTextOpts = {} ) {
	const a = create( { ...richTextOpts, html: htmlA } );
	const b = create( { ...richTextOpts, html: htmlB } );

	const d = diff.simpleDiffString( a.text, b.text );

	// By default, a Yjs string insertion will inherit the formats of the previous character.
	// We need to prevent this by inserting with an explicit format object nullifying the previous formats.
	const previousCharFormats = b.formats[ d.index - 1 ];
	const nullifierFormat = previousCharFormats?.reduce(
		( acc, { type } ) => ( {
			...acc,
			[ type ]: null,
		} ),
		{}
	);

	yxmlText.doc?.transact( () => {
		yxmlText.delete( d.index, d.remove );
		yxmlText.insert( d.index, d.insert, nullifierFormat );

		const gfa = gutenFormatsToYFormats( a.formats );
		const gfb = gutenFormatsToYFormats( b.formats );
		const df = diff.simpleDiffArray( gfa, gfb, isEqual );

		if ( df.remove ) {
			gfa.slice( df.index, df.index + df.remove ).forEach( ( f ) => {
				const tagName = Object.keys( f.format )[ 0 ];
				yxmlText.format( f.index, f.length, { [ tagName ]: null } );
			} );
		}

		if ( df.insert ) {
			df.insert.forEach( ( f ) => yxmlText.format( f.index, f.length, f.format ) );
		}
	} );
}

/**
 * Wraps each line of a multiline string with the given tags.
 *
 * @param {string} str A multiline string delimited by __UNSTABLE_LINE_SEPARATOR.
 * @param {string} multilineTag The tag name to wrap each line with.
 * @returns
 */
export function stringAsMultiline( str, multilineTag ) {
	return str
		.split( __UNSTABLE_LINE_SEPARATOR )
		.map( ( str ) => `<${ multilineTag }>${ str }</${ multilineTag }>` )
		.join( '' );
}
