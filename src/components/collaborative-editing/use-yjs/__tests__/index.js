/**
 * External dependencies
 */
import { render, screen, waitFor, within } from '@testing-library/react';
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

describe.skip( 'CollaborativeEditing', () => {
	it( 'should render without errors/warnings', () => {
		const [ transport ] = getTransports( 1 );
		render(
			<IsolatedBlockEditor settings={ {} }>
				<CollaborativeEditing settings={ { ...collabSettings, transport } } />
			</IsolatedBlockEditor>
		);
		expect( console ).not.toHaveErrored();
		expect( console ).not.toHaveWarned();
		expect( transport.connect ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should not connect if disabled', () => {
		const [ transport ] = getTransports( 1 );
		render(
			<IsolatedBlockEditor settings={ {} }>
				<CollaborativeEditing settings={ { ...collabSettings, transport, enabled: false } } />
			</IsolatedBlockEditor>
		);
		expect( transport.connect ).not.toHaveBeenCalled();
	} );

	it( "should show the connected peer's avatar in each editor", async () => {
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

		expect( aliceScreen.getByLabelText( 'Bob' ) ).toBeVisible();
		expect( bobScreen.getByLabelText( 'Alice' ) ).toBeVisible();
		await waitFor( () => expect( transport1.sendMessage ).toHaveBeenCalledTimes( 3 ) );
		await waitFor( () => expect( transport2.sendMessage ).toHaveBeenCalledTimes( 2 ) );
	} );

	it( 'should sync', async () => {
		const [ transport1, transport2 ] = getTransports( 2 );
		const onSave1 = jest.fn();
		const onSave2 = jest.fn();

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

		const aliceScreen = within( await screen.findByTestId( 'alice' ) );
		const bobScreen = within( screen.getByTestId( 'bob' ) );

		userEvent.click( aliceScreen.getByText( /^Start writing.+/ ) );
		userEvent.keyboard( 'hello' );
		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );

		userEvent.click( bobScreen.getByRole( 'document' ) );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );
		expect( bobScreen.getByTitle( 'Alice' ) ).toHaveTextContent( 'o' ); // peer caret

		userEvent.keyboard( '!' );

		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello!' );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello!' );

		expect( aliceScreen.getByTitle( 'Bob' ) ).toHaveTextContent( '!' ); // peer caret

		expect( onSave1 ).toHaveBeenLastCalledWith( '<!-- wp:paragraph -->\n<p>hello!</p>\n<!-- /wp:paragraph -->' );
		expect( onSave2 ).toHaveBeenLastCalledWith( '<!-- wp:paragraph -->\n<p>hello!</p>\n<!-- /wp:paragraph -->' );
	} );

	it( 'should work with initial onLoad content', async () => {
		const [ transport1, transport2 ] = getTransports( 2 );
		render(
			<>
				<div data-testid="alice">
					<IsolatedBlockEditor
						settings={ {} }
						onLoad={ ( parse ) => parse( `<!-- wp:paragraph --><p>initial</p><!-- /wp:paragraph -->` ) }
					>
						<CollaborativeEditing
							settings={ { ...collabSettings, transport: transport1, username: 'Alice' } }
						/>
					</IsolatedBlockEditor>
				</div>
				<div data-testid="bob">
					<IsolatedBlockEditor
						settings={ {} }
						onLoad={ ( parse ) => parse( `<!-- wp:paragraph --><p>initial</p><!-- /wp:paragraph -->` ) }
					>
						<CollaborativeEditing
							settings={ { ...collabSettings, transport: transport2, username: 'Bob' } }
						/>
					</IsolatedBlockEditor>
				</div>
			</>
		);

		const aliceScreen = within( await screen.findByTestId( 'alice' ) );
		const bobScreen = within( screen.getByTestId( 'bob' ) );

		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'initial' );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'initial' );

		userEvent.click( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) );
		userEvent.keyboard( 'typed' );

		userEvent.click( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) );

		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'initialtyped' );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'initialtyped' );
	} );
} );
