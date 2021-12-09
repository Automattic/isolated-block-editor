import * as Y from 'yjs';

import { create, toHTMLString } from '@wordpress/rich-text';
import '@wordpress/format-library';

import { applyHTMLDelta, gutenFormatsToYFormats, stringAsMultiline } from '../rich-text';

const yxmlTextFrom = ( html, richTextOpts = {} ) => {
	const yxmlText = new Y.Doc().get( 'text', Y.XmlText );
	applyHTMLDelta( '', html, yxmlText, richTextOpts );
	return yxmlText;
};

describe( 'gutenFormatsToYFormats', () => {
	it( 'should convert to a range-based Yjs format', () => {
		const { formats } = create( { html: '<a href="some-url">abc</a>' } );
		const result = gutenFormatsToYFormats( formats );
		expect( result ).toEqual( [ { format: { a: { href: 'some-url' } }, index: 0, length: 3 } ] );
	} );

	it( 'should handle nested tags', () => {
		const { formats } = create( { html: '<em>foo<strong>bar</strong></em>' } );
		const result = gutenFormatsToYFormats( formats );
		expect( result ).toEqual( [
			{ format: { em: true }, index: 0, length: 6 },
			{ format: { strong: true }, index: 3, length: 3 },
		] );
	} );
} );

describe( 'applyHTMLDelta', () => {
	it( 'should handle empty strings', () => {
		const before = '';
		const after = 'abc';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );

	it( 'should handle full replacements', () => {
		const before = 'foo';
		const after = 'bar';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );

	it( 'should add tags with attributes', () => {
		const before = 'abc';
		const after = '<a href="https://foo.com">abc</a>';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );

	it( 'should handle plain text before a tag', () => {
		const before = '<em>a</em>';
		const after = 'b<em>a</em>';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );

	it( 'should handle plain text after a tag', () => {
		const before = '<em>a</em>';
		const after = '<em>a</em>b';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );

	// TODO: This behavior was reversed in https://github.com/WordPress/gutenberg/pull/35016 😬
	it.skip( 'should handle nested tags', () => {
		const before = '<a href="url">link italic</a>';
		const after = '<a href="url">link <em>italic</em></a>';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		const yStringResult = yxmlText.toString();

		// yStringResult is not actually what we want:
		// '<a href="url">link </a><a href="url"><em>italic</em></a>'
		// But since @wordpress/rich-text can convert this back to the correct HTML,
		// it's ok for our purposes.
		const wpRichText = create( { html: yStringResult } );
		const wpRichTextStringResult = toHTMLString( { value: wpRichText } );
		expect( wpRichTextStringResult ).toBe( after );
	} );

	it( 'should remove tags', () => {
		const before = '<em>bold</em>';
		const after = 'bold';
		const yxmlText = yxmlTextFrom( before );
		applyHTMLDelta( before, after, yxmlText );
		expect( yxmlText.toString() ).toBe( after );
	} );
} );

describe( 'conflict merging', () => {
	const updateSimultaneously = ( initial, a, b ) => {
		const yxmlText1 = new Y.Doc().get( 'text', Y.XmlText );
		const yxmlText2 = new Y.Doc().get( 'text', Y.XmlText );

		applyHTMLDelta( '', initial, yxmlText1 );
		Y.applyUpdate( yxmlText2.doc, Y.encodeStateAsUpdate( yxmlText1.doc ) );

		applyHTMLDelta( initial, a, yxmlText1 );
		applyHTMLDelta( initial, b, yxmlText2 );

		const diff1 = Y.encodeStateAsUpdate( yxmlText1.doc, Y.encodeStateVector( yxmlText2.doc ) );
		const diff2 = Y.encodeStateAsUpdate( yxmlText2.doc, Y.encodeStateVector( yxmlText1.doc ) );

		Y.applyUpdate( yxmlText1.doc, diff2 );
		Y.applyUpdate( yxmlText2.doc, diff1 );

		return [ yxmlText1.toString(), yxmlText2.toString() ];
	};

	it( 'should merge an append and prepend', () => {
		const [ a, b ] = updateSimultaneously( 'bb', 'abb', 'bbc' );
		expect( a ).toBe( 'abbc' );
		expect( a ).toBe( b );
	} );

	it( 'should handle attribute value replacement', () => {
		const htmlA = '<a href="some-url">foo</a>';
		const htmlB = '<a href="another-url">foo</a>';
		const [ a, b ] = updateSimultaneously( 'foo', htmlA, htmlB );

		// Either value is ok, but results must match
		expect( [ htmlA, htmlB ] ).toContain( a );
		expect( a ).toBe( b );
	} );

	it( 'should apply both formats', () => {
		const [ a, b ] = updateSimultaneously( 'foo', '<em>foo</em>', '<code>foo</code>' );
		expect( a ).toBe( '<code><em>foo</em></code>' );
		expect( a ).toBe( b );
	} );
} );

describe( 'multiline', () => {
	it( 'should support multiline tags', () => {
		const before = '<li>foo</li><li>foo</li>';
		const after = '<li>foo</li><li>bar</li>';
		const yxmlText = yxmlTextFrom( before, { multilineTag: 'li' } );
		applyHTMLDelta( before, after, yxmlText, { multilineTag: 'li' } );
		const result = stringAsMultiline( yxmlText.toString(), 'li' );
		expect( result ).toBe( after );
	} );

	it( 'should support multiline tags with nested tags', () => {
		const before = '<li><em>foo</em></li><li>foo</li>';
		const after = '<li>foo</li><li><em>bar</em></li>';
		const yxmlText = yxmlTextFrom( before, { multilineTag: 'li' } );
		applyHTMLDelta( before, after, yxmlText, { multilineTag: 'li' } );
		const result = stringAsMultiline( yxmlText.toString(), 'li' );
		expect( result ).toBe( after );
	} );
} );
