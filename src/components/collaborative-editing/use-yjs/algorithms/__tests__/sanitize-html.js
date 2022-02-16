import sanitizeHTML from '../sanitize-html';

describe( 'sanitizeHTML', () => {
	it( 'should remove script tags', () => {
		expect( sanitizeHTML( 'hello<script>alert();</script>world' ) ).toEqual(
			expect.not.stringContaining( 'alert' )
		);
	} );

	it( 'should remove on* attributes', () => {
		expect( sanitizeHTML( '<button onclick="alert()">click</button>' ) ).toEqual(
			expect.not.stringContaining( 'alert' )
		);
	} );

	it( 'should keep incomplete HTML intact if there is nothing to be sanitized', () => {
		const html = '<button>still typing</bu';
		expect( sanitizeHTML( html ) ).toBe( html );
	} );

	it( 'should sanitize incomplete HTML if it is already dangerous', () => {
		expect( sanitizeHTML( '<button onclick="alert()">still typing</bu' ) ).toEqual(
			expect.not.stringContaining( 'alert' )
		);
	} );
} );
