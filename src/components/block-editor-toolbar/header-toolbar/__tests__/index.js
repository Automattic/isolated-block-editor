/**
 * WordPress dependencies
 */
import { render, screen } from '@testing-library/react';
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import HeaderToolbar from '../index';

jest.mock( '@wordpress/components', () => {
	const { createElement, forwardRef } = require( '@wordpress/element' );

	return {
		Button: forwardRef( ( props, ref ) => createElement( 'button', { ref } ) ),
		ToolbarItem: forwardRef( ( props, ref ) => createElement( 'button', { ref } ) ),
		Popover: ( { children } ) => createElement( 'div', null, children ),
	};
} );

jest.mock( '../redo', () => () => null );
jest.mock( '../undo', () => () => null );
jest.mock( '../../block-navigation', () => () => null );

// Mirrors the real inserter menu, which reads `ref.current.ownerDocument` after a block is inserted
jest.mock( '@wordpress/block-editor', () => {
	const { createElement, forwardRef, useEffect } = require( '@wordpress/element' );

	return {
		NavigableToolbar: ( { children } ) => createElement( 'div', null, children ),
		ToolSelector: () => null,
		__experimentalLibrary: forwardRef( ( props, ref ) => {
			useEffect( () => {
				ref.current.ownerDocument.hasFocus();
			}, [ ref ] );

			return createElement( 'div', { ref, 'data-testid': 'library' } );
		} ),
	};
} );

const emptyReducer = ( state = {} ) => state;

register(
	createReduxStore( 'isolated/editor', {
		reducer: emptyReducer,
		actions: {
			setIsInserterOpened: () => ( { type: 'NOOP' } ),
			setIsListViewOpened: () => ( { type: 'NOOP' } ),
		},
		selectors: {
			isFeatureActive: () => false,
			getEditorMode: () => 'visual',
			isListViewOpened: () => false,
			isInserterOpened: () => true,
		},
	} )
);

register(
	createReduxStore( 'core/editor', {
		reducer: emptyReducer,
		selectors: { getEditorSettings: () => ( { richEditingEnabled: true } ) },
	} )
);

register(
	createReduxStore( 'core/block-editor', {
		reducer: emptyReducer,
		selectors: {
			hasInserterItems: () => true,
			getBlockRootClientId: () => null,
			getBlockSelectionEnd: () => null,
		},
	} )
);

describe( 'HeaderToolbar', () => {
	const settings = {
		iso: {
			toolbar: { inserter: true, navigation: false, undo: false, selectorTool: false },
			sidebar: { inserter: false },
		},
	};

	it( 'passes a ref to the popover block inserter library', () => {
		expect( () => render( <HeaderToolbar settings={ settings } /> ) ).not.toThrow();
		expect( screen.getByTestId( 'library' ) ).toBeInTheDocument();
	} );
} );
