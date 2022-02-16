import * as Y from 'yjs';

import { create, toHTMLString } from '@wordpress/rich-text';
import '@wordpress/format-library';

import { applyHTMLDelta, gutenFormatsToYFormats, richTextMapToHTML } from '../rich-text';

const richTextMapFrom = ( html ) => {
	const richTextMap = new Y.Doc().get( 'richTextMap', Y.Map );
	richTextMap.set( 'xmlText', new Y.XmlText() );
	richTextMap.set( 'multilineTag', undefined );
	richTextMap.set( 'replacements', new Y.Array() );
	applyHTMLDelta( '', html, richTextMap );
	return richTextMap;
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
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should handle full replacements', () => {
		const before = 'foo';
		const after = 'bar';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should add tags with attributes', () => {
		const before = 'abc';
		const after = '<a href="https://foo.com">abc</a>';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should handle plain text before a tag', () => {
		const before = '<em>a</em>';
		const after = 'b<em>a</em>';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should handle plain text after a tag', () => {
		const before = '<em>a</em>';
		const after = '<em>a</em>b';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	// TODO: Unsolved problem
	it.skip( 'should handle nested tags', () => {
		const before = '<a href="url">link italic</a>';
		const after = '<a href="url">link <em>italic</em></a>';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		const yxmlResult = richTextMapToHTML( richTextMap );

		// yxmlResult is not actually what we want:
		// '<a href="url">link </a><a href="url"><em>italic</em></a>'
		// But since @wordpress/rich-text can convert this back to the correct HTML,
		// it's ok for our purposes.
		// Update 2021-12-11: This behavior was reversed in https://github.com/WordPress/gutenberg/pull/35016 😬
		// Should we use normaliseFormats() in richTextMapToHTML?
		// https://github.com/WordPress/gutenberg/blob/trunk/packages/rich-text/src/normalise-formats.js
		const wpRichText = create( { html: yxmlResult } );
		const wpRichTextStringResult = toHTMLString( { value: wpRichText } );
		expect( wpRichTextStringResult ).toBe( after );
	} );

	// TODO: Unsolved problem
	it.skip( 'should not merge adjacent tags', () => {
		const before = '<code>foobar</code>';
		const after = '<code>foo</code><code>bar</code>';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should remove tags', () => {
		const before = '<em>bold</em>';
		const after = 'bold';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should handle inline images', () => {
		const before = 'my pic';
		const after = 'my <img src="foo" alt="bar"> pic';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );
} );

describe( 'conflict merging', () => {
	const updateSimultaneously = ( initial, a, b ) => {
		const richTextMap1 = richTextMapFrom( initial );
		const richTextMap2 = richTextMapFrom( initial );

		Y.applyUpdate( richTextMap1.doc, Y.encodeStateAsUpdate( richTextMap2.doc ) );
		Y.applyUpdate( richTextMap2.doc, Y.encodeStateAsUpdate( richTextMap1.doc ) );

		applyHTMLDelta( richTextMapToHTML( richTextMap1 ), a, richTextMap1 );
		applyHTMLDelta( richTextMapToHTML( richTextMap2 ), b, richTextMap2 );

		Y.applyUpdate( richTextMap1.doc, Y.encodeStateAsUpdate( richTextMap2.doc ) );
		Y.applyUpdate( richTextMap2.doc, Y.encodeStateAsUpdate( richTextMap1.doc ) );

		return [ richTextMap1, richTextMap2 ].map( richTextMapToHTML );
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
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );

	it( 'should support multiline tags with nested tags', () => {
		const before = '<li><em>foo</em></li><li>foo</li>';
		const after = '<li>foo</li><li><em>bar</em></li>';
		const richTextMap = richTextMapFrom( before );
		applyHTMLDelta( before, after, richTextMap );
		expect( richTextMapToHTML( richTextMap ) ).toBe( after );
	} );
} );
