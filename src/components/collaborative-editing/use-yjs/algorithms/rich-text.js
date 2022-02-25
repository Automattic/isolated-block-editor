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
import { create, toHTMLString, __UNSTABLE_LINE_SEPARATOR } from '@wordpress/rich-text';

const OBJECT_REPLACEMENT_CHARACTER = '\ufffc'; // defined in @wordpress/rich-text special-characters

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
	const formatTypeRecord = select( 'core/rich-text' ).getFormatType( format.type );
	if ( ! formatTypeRecord ) return { [ format.type ]: true };

	const { tagName, attributes = {} } = formatTypeRecord;
	if ( ! format.attributes ) return { [ tagName ]: true };

	const remappedEntries = Object.entries( format.attributes ).map( ( [ key, value ] ) => [
		attributes[ key ],
		value,
	] );
	return { [ tagName ]: Object.fromEntries( remappedEntries ) };
}

// TODO: Unsolved problem
// This is an imperfect inferral, so ideally we want to get this information
// from Gutenberg's internal representation of the RichText.
function getInferredMultilineTag( html ) {
	const trimmedHtml = html.trim();
	if ( /^<li>/.test( trimmedHtml ) ) return 'li';
	if ( /^<p>/.test( trimmedHtml ) ) return 'p';
	return undefined;
}

/**
 * Apply the delta between two HTML strings to a Y.XmlText.
 *
 * @param {string} htmlA
 * @param {string} htmlB
 * @param {import("yjs").Map} richTextMap
 * @param {Object} [richTextOpts] Optional options object to pass @wordpress/rich-text create().
 */
export function applyHTMLDelta( htmlA, htmlB, richTextMap, richTextOpts = {} ) {
	const [ multilineTagA, multilineTagB ] = [ htmlA, htmlB ].map( getInferredMultilineTag );
	const inferredMultilineTag = multilineTagA || multilineTagB;
	const mergedRichTextOpts = {
		...( inferredMultilineTag ? { multilineTag: inferredMultilineTag } : {} ),
		...richTextOpts,
	};

	richTextMap.set( 'multilineTag', inferredMultilineTag );

	const a = create( { ...mergedRichTextOpts, html: htmlA } );
	const b = create( { ...mergedRichTextOpts, html: htmlB } );

	const stringDiff = diff.simpleDiffString( a.text, b.text );

	// By default, a Yjs string insertion will inherit the formats of the previous character.
	// We need to prevent this by inserting with an explicit format object nullifying the previous formats.
	const previousCharFormats = b.formats[ stringDiff.index - 1 ];
	const nullifierFormat = previousCharFormats?.reduce(
		( acc, { type } ) => ( {
			...acc,
			[ type ]: null,
		} ),
		{}
	);

	// Yjs can't do insertion operations on sparse arrays. Since replacements do not rely on
	// an index-based mapping with the full text, let's condense the arrays here.
	const toDenseArray = ( arr ) => arr.filter( ( x ) => x );
	const replacementsDiff = diff.simpleDiffArray( toDenseArray( a.replacements ), toDenseArray( b.replacements ) );

	richTextMap.doc?.transact( () => {
		richTextMap.get( 'xmlText' ).delete( stringDiff.index, stringDiff.remove );
		richTextMap.get( 'xmlText' ).insert( stringDiff.index, stringDiff.insert, nullifierFormat );

		const yfa = gutenFormatsToYFormats( a.formats );
		const yfb = gutenFormatsToYFormats( b.formats );
		const formatsDiff = diff.simpleDiffArray( yfa, yfb, isEqual );

		if ( formatsDiff.remove ) {
			yfa.slice( formatsDiff.index, formatsDiff.index + formatsDiff.remove ).forEach( ( f ) => {
				const tagName = Object.keys( f.format )[ 0 ];
				richTextMap.get( 'xmlText' ).format( f.index, f.length, { [ tagName ]: null } );
			} );
		}
		if ( formatsDiff.insert ) {
			formatsDiff.insert.forEach( ( f ) => richTextMap.get( 'xmlText' ).format( f.index, f.length, f.format ) );
		}

		richTextMap.get( 'replacements' ).delete( replacementsDiff.index, replacementsDiff.remove );
		richTextMap.get( 'replacements' ).insert( replacementsDiff.index, replacementsDiff.insert );
	} );
}

/**
 * Convert the RichText back from our Yjs representation to an HTML string.
 *
 * @param {import("yjs").Map} richTextMap
 * @returns {string}
 */
export function richTextMapToHTML( richTextMap ) {
	let text = richTextMap.get( 'xmlText' ).toString();

	richTextMap.get( 'replacements' ).forEach( ( replacement ) => {
		const replacementHTML = toHTMLString( {
			value: { replacements: [ replacement ], formats: Array( 1 ), text: OBJECT_REPLACEMENT_CHARACTER },
		} );
		text = text.replace( OBJECT_REPLACEMENT_CHARACTER, replacementHTML );
	} );

	const multilineTag = richTextMap.get( 'multilineTag' );

	return multilineTag ? stringAsMultiline( text, multilineTag ) : text;
}

/**
 * Wraps each line of a multiline string with the given tags.
 *
 * @param {string} str A multiline string delimited by __UNSTABLE_LINE_SEPARATOR.
 * @param {string} multilineTag The tag name to wrap each line with.
 * @returns
 */
function stringAsMultiline( str, multilineTag ) {
	return str
		.split( __UNSTABLE_LINE_SEPARATOR )
		.map( ( str ) => `<${ multilineTag }>${ str }</${ multilineTag }>` )
		.join( '' );
}
