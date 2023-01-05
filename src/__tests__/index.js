/**
 * External dependencies
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import IsolatedBlockEditor from '../';

describe.skip( 'IsolatedBlockEditor', () => {
	it( 'should render without errors/warnings', () => {
		render( <IsolatedBlockEditor settings={ {} } /> );
		expect( console ).not.toHaveErrored();
		expect( console ).not.toHaveWarned();
	} );

	it( 'should isolate content between editors', () => {
		const onSave1 = jest.fn();
		const onSave2 = jest.fn();
		render(
			<>
				<div data-testid="alice">
					<IsolatedBlockEditor settings={ {} } onSaveContent={ onSave1 } />
				</div>
				<div data-testid="bob">
					<IsolatedBlockEditor settings={ {} } onSaveContent={ onSave2 } />
				</div>
			</>
		);
		const aliceScreen = within( screen.getByTestId( 'alice' ) );
		const bobScreen = within( screen.getByTestId( 'bob' ) );

		userEvent.click( aliceScreen.getByText( /^Start writing.+/ ) );
		userEvent.keyboard( 'hello' );

		userEvent.click( bobScreen.getByText( /^Start writing.+/ ) );
		userEvent.keyboard( 'world' );

		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'world' );

		expect( onSave1 ).toHaveBeenLastCalledWith( '<!-- wp:paragraph -->\n<p>hello</p>\n<!-- /wp:paragraph -->' );
		expect( onSave2 ).toHaveBeenLastCalledWith( '<!-- wp:paragraph -->\n<p>world</p>\n<!-- /wp:paragraph -->' );
	} );

	describe( 'Externally controlled content', () => {
		let onInputMock;
		let onChangeMock;
		let undoManager;

		beforeEach( () => {
			onInputMock = jest.fn();
			onChangeMock = jest.fn();
			undoManager = {
				undo: jest.fn(),
				redo: jest.fn(),
				redoStack: [],
				undoStack: [],
			};
		} );

		it( 'should call onInput when content changes', () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ undoManager }
					settings={ {} }
				/>
			);

			const input = screen.getByText( /^Start writing.+/ );
			userEvent.click( input );
			userEvent.keyboard( 'test' );

			expect( onInputMock ).toHaveBeenCalledWith( expect.any( Array ), expect.any( Object ) );
		} );

		it( 'should call onChange when content changes', () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ undoManager }
					settings={ {} }
				/>
			);

			const input = screen.getByText( /^Start writing.+/ );
			userEvent.click( input );
			userEvent.keyboard( 'test' );

			expect( onChangeMock ).toHaveBeenCalledWith( expect.any( Array ), expect.any( Object ) );
		} );

		it( 'should call onSelection when the editor selection changes', () => {
			const onSelectionMock = jest.fn();

			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnSelection={ onSelectionMock }
					settings={ {} }
				/>
			);

			const input = screen.getByText( /^Start writing.+/ );
			userEvent.click( input );
			userEvent.keyboard( 'test' );

			expect( onSelectionMock ).toHaveBeenCalledWith(
				expect.objectContaining( {
					start: expect.objectContaining( {
						clientId: expect.any( String ),
						attributeKey: expect.any( String ),
						offset: expect.any( Number ),
					} ),
					end: expect.objectContaining( {
						clientId: expect.any( String ),
						attributeKey: expect.any( String ),
						offset: expect.any( Number ),
					} ),
				} )
			);
		} );

		it( "should call undo when undoManager's undo is requested", async () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ { ...undoManager, undoStack: [ {} ] } }
					settings={ {} }
				/>
			);

			const undo = screen.getByLabelText( 'Undo' );
			userEvent.click( undo );

			expect( undoManager.undo ).toHaveBeenCalled();
		} );

		it( "should not call undoManager's undo when undo is requested but there is no stack", async () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ { ...undoManager, undoStack: [] } }
					settings={ {} }
				/>
			);

			const undo = screen.getByLabelText( 'Undo' );
			userEvent.click( undo );

			expect( undoManager.undo ).not.toHaveBeenCalled();
		} );

		it( "should call undoManager's redo when redo is requested", async () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ { ...undoManager, redoStack: [ {} ] } }
					settings={ {} }
				/>
			);

			const redo = screen.getByLabelText( 'Redo' );
			userEvent.click( redo );

			expect( undoManager.redo ).toHaveBeenCalled();
		} );

		it( "should not call undoManager's redo when redo is requested but there is no stack", async () => {
			render(
				<IsolatedBlockEditor
					__experimentalValue={ [] }
					__experimentalOnInput={ onInputMock }
					__experimentalOnChange={ onChangeMock }
					__experimentalUndoManager={ { ...undoManager, redoStack: [] } }
					settings={ {} }
				/>
			);

			const redo = screen.getByLabelText( 'Redo' );
			userEvent.click( redo );

			expect( undoManager.redo ).not.toHaveBeenCalled();
		} );
	} );
} );
