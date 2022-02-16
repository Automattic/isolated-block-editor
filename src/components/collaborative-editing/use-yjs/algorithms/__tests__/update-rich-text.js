/**
 * External dependencies
 */
import * as yjs from 'yjs';

/**
 * Internal dependencies
 */
import { updateRichText } from '../yjs';
import { applyHTMLDelta } from '../rich-text';
import * as RichText from '../rich-text';

jest.spyOn( RichText, 'applyHTMLDelta' );

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
			newBlock: { clientId: 'cid', attributes: { foo: 'abc' } },
			attributeKey: 'foo',
			richTexts,
		} );

		updateRichText( {
			newBlock: { clientId: 'cid', attributes: { foo: 'abbc' } },
			attributeKey: 'foo',
			richTexts,
		} );

		const yxmlText = richTexts.get( 'cid' ).get( 'foo' );
		expect( applyHTMLDelta ).toHaveBeenLastCalledWith( 'abc', 'abbc', yxmlText );
	} );
} );
