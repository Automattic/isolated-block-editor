import { calculateNewPosition } from '../relative-position';

describe( 'calculateNewPosition', () => {
	it( 'should map "|foo" to "|bar"', () => {
		const newPosition = calculateNewPosition( 'foo', 'bar', 0 );
		expect( newPosition ).toBe( 0 );
	} );

	it( 'should map "foo|" to "bar|"', () => {
		const newPosition = calculateNewPosition( 'foo', 'bar', 3 );
		expect( newPosition ).toBe( 3 );
	} );

	it( 'should map "abc|" to "bc|"', () => {
		const newPosition = calculateNewPosition( 'abc', 'bc', 3 );
		expect( newPosition ).toBe( 2 );
	} );

	it( 'should map "foo|baz" to "bar|baz"', () => {
		const newPosition = calculateNewPosition( 'foobaz', 'barbaz', 3 );
		expect( newPosition ).toBe( 3 );
	} );

	it( 'should map "fob|ar" to "foob|ar"', () => {
		const newPosition = calculateNewPosition( 'fobar', 'foobar', 3 );
		expect( newPosition ).toBe( 4 );
	} );

	it( 'should map "foo|" to "foo|bar"', () => {
		const newPosition = calculateNewPosition( 'foo', 'foobar', 3 );
		expect( newPosition ).toBe( 3 );
	} );

	it( 'should map "bar|" to "foobar|"', () => {
		const newPosition = calculateNewPosition( 'bar', 'foobar', 3 );
		expect( newPosition ).toBe( 6 );
	} );

	it( 'should ignore HTML tags', () => {
		const newPosition = calculateNewPosition( '<em>foo</em>', '<strong>foo</strong>', 3 );
		expect( newPosition ).toBe( 3 );
	} );

	it( 'should map "<li>bar|</li>" to "<li>foobar|</li>"', () => {
		const newPosition = calculateNewPosition( '<li>bar</li>', '<li>foobar</li>', 3 );
		expect( newPosition ).toBe( 6 );
	} );
} );
