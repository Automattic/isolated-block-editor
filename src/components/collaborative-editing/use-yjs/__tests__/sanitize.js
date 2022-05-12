/**
 * External dependencies
 */
import { render, screen, within } from '@testing-library/react';
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

describe( 'Collaborative Editing: Sanitize', () => {
	it( 'should sanitize HTML received from peer', async () => {
		const [ transport1, transport2 ] = getTransports( 2 );

		render(
			<>
				<div data-testid="alice">
					<IsolatedBlockEditor settings={ {} }>
						<CollaborativeEditing
							settings={ { ...collabSettings, transport: transport1, username: 'Alice' } }
						/>
					</IsolatedBlockEditor>
				</div>
				<div data-testid="bob">
					<IsolatedBlockEditor settings={ {} }>
						<CollaborativeEditing
							settings={ { ...collabSettings, transport: transport2, username: 'Bob' } }
						/>
					</IsolatedBlockEditor>
				</div>
			</>
		);

		const aliceScreen = within( await screen.findByTestId( 'alice' ) );
		const bobScreen = within( screen.getByTestId( 'bob' ) );

		userEvent.click( aliceScreen.getByText( /^Start writing.+/ ) );
		userEvent.click( aliceScreen.getByRole( 'button', { name: 'Toggle block inserter' } ) );
		userEvent.type( aliceScreen.getByRole( 'searchbox' ), 'custom' );
		userEvent.click( aliceScreen.getByRole( 'option', { name: 'Custom HTML' } ) );
		userEvent.click( aliceScreen.getByRole( 'textbox', { name: 'HTML' } ) );
		userEvent.keyboard( 'hi<s' );

		// Invalid and safe HTML is synced over intact
		userEvent.click( bobScreen.getByRole( 'document' ) );
		expect( bobScreen.getByRole( 'document', { name: 'Block: Custom HTML' } ) ).toHaveTextContent( 'hi<s' );

		userEvent.click( aliceScreen.getByRole( 'textbox', { name: 'HTML' } ) );
		userEvent.keyboard( 'cript>throw "pwned!"</script>' );

		// Valid, dangerous HTML is removed on receive
		userEvent.click( bobScreen.getByRole( 'document' ) );
		expect( bobScreen.getByRole( 'document', { name: 'Block: Custom HTML' } ) ).toHaveTextContent( 'hi' );

		// Previewing the Custom HTML block should not execute malicious scripts synced by attacker
		userEvent.click( bobScreen.getByRole( 'button', { name: 'Preview' } ) );
		expect( console ).not.toHaveErrored();
	} );
} );
