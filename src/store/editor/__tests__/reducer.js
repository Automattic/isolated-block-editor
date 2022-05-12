/**
 * WordPress dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';

/**
 * Internal dependencies
 */
import reducer from '../reducer';

beforeAll( () => {
	registerCoreBlocks();
} );

describe( 'isolated/editor store', () => {
	describe( 'reducer', () => {
		it( 'editor becomes ready', () => {
			const state = reducer( { isReady: false }, { type: 'SET_EDITOR_READY', isReady: true } );

			expect( state.isReady ).toBe( true );
		} );

		it( 'inspector is closed when inserter is opened', () => {
			const state = reducer( { isInserterOpened: false }, { type: 'SET_INSERTER_OPEN', isOpen: true } );

			expect( state ).toEqual( { isInserterOpened: true, isInspectorOpened: false, isListViewOpened: false } );
		} );

		it( 'inspector is closed when inserter is closed', () => {
			const state = reducer( { isInserterOpened: true }, { type: 'SET_INSERTER_OPEN', isOpen: false } );

			expect( state ).toEqual( { isInserterOpened: false, isInspectorOpened: false, isListViewOpened: false } );
		} );
	} );
} );
