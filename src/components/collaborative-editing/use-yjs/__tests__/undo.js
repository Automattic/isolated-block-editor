/**
 * External dependencies
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { CollaborativeEditing } from '../../../../index';
import { getTransports } from '../__test-helpers__/utils';

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

		// Emulate pause for Yjs to make a new undo stack item
		screen.getByRole( 'document', { name: 'Paragraph block' } ).blur();
		await waitFor( () => new Promise( ( resolve ) => setTimeout( resolve, 500 ) ) );
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
} );
