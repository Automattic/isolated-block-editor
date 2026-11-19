/**
 * WordPress dependencies
 */
import { render, screen } from '@testing-library/react';
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import InserterSidebar from '../inserter-sidebar';

// Mirrors the real inserter menu, which reads `ref.current.ownerDocument` after a block is inserted
jest.mock( '@wordpress/block-editor', () => {
	const { createElement, forwardRef, useEffect } = require( '@wordpress/element' );

	return {
		__experimentalLibrary: forwardRef( ( props, ref ) => {
			useEffect( () => {
				ref.current.ownerDocument.hasFocus();
			}, [ ref ] );

			return createElement( 'div', { ref, 'data-testid': 'library' } );
		} ),
	};
} );

register(
	createReduxStore( 'isolated/editor', {
		reducer: ( state = {} ) => state,
		actions: { setIsInserterOpened: () => ( { type: 'NOOP' } ) },
	} )
);

describe( 'InserterSidebar', () => {
	it( 'passes a ref to the block inserter library', () => {
		expect( () => render( <InserterSidebar /> ) ).not.toThrow();
		expect( screen.getByTestId( 'library' ) ).toBeInTheDocument();
	} );
} );
