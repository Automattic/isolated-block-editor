/**
 * External dependencies
 */
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { CollaborativeEditing } from '../../../../index';
import { getTransports, pauseTyping } from '../__test-helpers__/utils';

const collabSettings = {
	enabled: true,
	username: 'Peery Peerson',
	avatarUrl: 'fake-image.jpg',
};

describe( 'CollaborativeEditing: Undo/Redo', () => {
	beforeEach( () => {
		// Real timers are used so Yjs can merge undo stack items
		jest.useRealTimers();
	} );

	afterEach( () => {
		jest.useFakeTimers();
	} );

	it( 'should undo/redo single user edits', async () => {
		const [ transport ] = getTransports( 1 );
		const onSave = jest.fn();

		render(
			<IsolatedBlockEditor settings={ {} } onSaveContent={ onSave }>
				<CollaborativeEditing settings={ { ...collabSettings, transport } } />
			</IsolatedBlockEditor>
		);

		expect( screen.getByRole( 'button', { name: 'Undo' } ) ).toHaveAttribute( 'aria-disabled', 'true' );
		expect( screen.getByRole( 'button', { name: 'Redo' } ) ).toHaveAttribute( 'aria-disabled', 'true' );

		userEvent.click( screen.getByText( /^Start writing.+/ ) );

		userEvent.keyboard( 'hello' );
		expect( screen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );

		await pauseTyping( screen );

		userEvent.click( screen.getByRole( 'document', { name: 'Paragraph block' } ) );

		userEvent.keyboard( 'world' );
		expect( screen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'helloworld' );

		expect( screen.getByRole( 'button', { name: 'Undo' } ) ).toHaveAttribute( 'aria-disabled', 'false' );
		userEvent.click( screen.getByRole( 'button', { name: 'Undo' } ) );

		expect( screen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );

		expect( screen.getByRole( 'button', { name: 'Undo' } ) ).toHaveAttribute( 'aria-disabled', 'false' );
		expect( screen.getByRole( 'button', { name: 'Redo' } ) ).toHaveAttribute( 'aria-disabled', 'false' );
		userEvent.click( screen.getByRole( 'button', { name: 'Undo' } ) );

		expect( screen.getByText( /^Start writing.+/ ) ).toBeInTheDocument();
		expect( onSave ).toHaveBeenLastCalledWith( '' );

		expect( screen.getByRole( 'button', { name: 'Undo' } ) ).toHaveAttribute( 'aria-disabled', 'true' );
		expect( screen.getByRole( 'button', { name: 'Redo' } ) ).toHaveAttribute( 'aria-disabled', 'false' );

		userEvent.click( screen.getByRole( 'button', { name: 'Redo' } ) );
		expect( screen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );

		userEvent.click( screen.getByRole( 'button', { name: 'Redo' } ) );
		expect( screen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'helloworld' );
	} );

	it( 'should only undo/redo own edits', async () => {
		const [ transport1, transport2 ] = getTransports( 2 );
		const [ onSave1, onSave2 ] = [ jest.fn(), jest.fn() ];
		await act( async () => {
			render(
				<>
					<div data-testid="alice">
						<IsolatedBlockEditor settings={ {} } onSaveContent={ onSave1 }>
							<CollaborativeEditing
								settings={ { ...collabSettings, transport: transport1, username: 'Alice' } }
							/>
						</IsolatedBlockEditor>
					</div>
					<div data-testid="bob">
						<IsolatedBlockEditor settings={ {} } onSaveContent={ onSave2 }>
							<CollaborativeEditing
								settings={ { ...collabSettings, transport: transport2, username: 'Bob' } }
							/>
						</IsolatedBlockEditor>
					</div>
				</>
			);
		} );
		const aliceScreen = within( screen.getByTestId( 'alice' ) );
		const bobScreen = within( screen.getByTestId( 'bob' ) );

		userEvent.click( aliceScreen.getByText( /^Start writing.+/ ) );
		userEvent.keyboard( 'alice:{Enter}' );

		await pauseTyping( aliceScreen );

		userEvent.click( bobScreen.getAllByRole( 'document' )[ 1 ] );
		userEvent.keyboard( 'bobby:' );

		userEvent.click( bobScreen.getByRole( 'button', { name: 'Undo' } ) );
		expect( screen.queryByText( 'bobby:' ) ).toBe( null );

		userEvent.click( bobScreen.getAllByRole( 'document' )[ 1 ] );
		userEvent.keyboard( 'bob:' );

		await pauseTyping( bobScreen );

		userEvent.click( aliceScreen.getAllByRole( 'document' )[ 0 ] );
		userEvent.keyboard( 'hello' );

		userEvent.click( bobScreen.getByRole( 'button', { name: 'Undo' } ) );
		expect( screen.queryByText( 'bob:' ) ).toBe( null );
		expect( screen.getByText( 'alice:hello' ) ).toBeInTheDocument();

		userEvent.click( aliceScreen.getByRole( 'button', { name: 'Undo' } ) );
		expect( screen.queryByText( 'hello' ) ).toBe( null );

		userEvent.click( bobScreen.getByRole( 'button', { name: 'Redo' } ) );
		expect( screen.getByText( 'bob:' ) ).toBeInTheDocument();

		// Both editors should have the same content
		expect( onSave1 ).toHaveBeenLastCalledWith( onSave2.mock.calls[ onSave2.mock.calls.length - 1 ][ 0 ] );
	} );
} );
