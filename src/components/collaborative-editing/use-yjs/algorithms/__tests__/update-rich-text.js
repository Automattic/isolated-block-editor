/**
 * External dependencies
 */
import * as yjs from 'yjs';

/**
 * Internal dependencies
 */
import { updateRichText } from '../yjs';
import { applyHTMLDelta } from '../rich-text';

jest.mock( '../rich-text', () => ( {
	__esModule: true,
	...jest.requireActual( '../rich-text' ),
	applyHTMLDelta: jest.fn(),
} ) );

describe( 'yjs: updateRichText', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should call applyHTMLDelta() with the correct args when the block is new', () => {
		const doc = new yjs.Doc();
		const richTexts = doc.getMap( 'richTexts' );

		updateRichText( {
			newBlock: { clientId: 'cid', attributes: { foo: 'abc' } },
			attributeKey: 'foo',
			richTexts,
		} );

		const yxmlText = richTexts.get( 'cid' ).get( 'foo' );
		expect( applyHTMLDelta ).toHaveBeenCalledWith( '', 'abc', yxmlText );
	} );

	it( 'should call applyHTMLDelta() with the correct args when the block is pre-existing', () => {
		const doc = new yjs.Doc();
		const richTexts = doc.getMap( 'richTexts' );

		updateRichText( {
			oldText: 'abc',
			newBlock: { clientId: 'cid', attributes: { foo: 'abbc' } },
			attributeKey: 'foo',
			richTexts,
		} );

		const yxmlText = richTexts.get( 'cid' ).get( 'foo' );
		expect( applyHTMLDelta ).toHaveBeenCalledWith( 'abc', 'abbc', yxmlText );
	} );

	it( 'should not call applyHTMLDelta() if rich text strings have not changed', () => {
		const doc = new yjs.Doc();
		const richTexts = doc.getMap( 'richTexts' );

		updateRichText( {
			oldText: 'abc',
			newBlock: { clientId: 'cid', attributes: { foo: 'abc' } },
			attributeKey: 'foo',
			richTexts,
		} );

		expect( applyHTMLDelta ).not.toHaveBeenCalled();

		updateRichText( {
			oldText: '',
			newBlock: { clientId: 'cid', attributes: { foo: '' } },
			attributeKey: 'foo',
			richTexts,
		} );

		expect( applyHTMLDelta ).not.toHaveBeenCalled();
	} );
} );
