/**
 * External dependencies
 */
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import IsolatedBlockEditor, { CollaborativeEditing } from '../../../../index';

/**
 * Helper to generate mock transport modules for an isolated channel.
 *
 * @param {number} count - Number of transport modules to generate.
 * @return {Object[]} - Array of transport modules.
 */
function getTransports( count ) {
	const peers = {};

	const getAvailablePeers = ( excludeId ) =>
		Object.values( peers ).reduce( ( acc, p ) => {
			if ( p.user.id === excludeId ) return acc;
			return [ ...acc, p.user ];
		}, [] );

	const mockTransport = () => ( {
		_identity: undefined,
		connect: jest.fn( ( { onReceiveMessage, setAvailablePeers, user } ) => {
			mockTransport._identity = user.identity;
			peers[ user.identity ] = { onReceiveMessage, setAvailablePeers, user: { ...user, id: user.identity } };
			Object.keys( peers ).forEach( ( identity ) => {
				peers[ identity ].setAvailablePeers( getAvailablePeers( identity ) );
			} );
			return Promise.resolve( { isFirstInChannel: Object.keys( peers ).length === 1 } );
		} ),
		sendMessage: jest.fn( ( data ) => {
			// console.log( data.message.messageType, data.identity.substring( 0, 4 ) );
			Object.keys( peers ).forEach( ( identity ) => {
				if ( identity !== data.identity ) {
					peers[ identity ].onReceiveMessage( data );
				}
			} );
		} ),
		disconnect: jest.fn( () => {
			delete peers[ mockTransport._identity ];
			Object.keys( peers ).forEach( ( identity ) => {
				peers[ identity ].setAvailablePeers( getAvailablePeers( identity ) );
			} );
		} ),
	} );

	return Array( count )
		.fill( null )
		.map( () => mockTransport() );
}

const collabSettings = {
	enabled: true,
	username: 'Peery Peerson',
	avatarUrl: 'fake-image.jpg',
};

describe( 'CollaborativeEditing', () => {
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
		await act( async () => {
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
		} );
		const aliceScreen = within( screen.getByTestId( 'alice' ) );
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
		userEvent.keyboard( 'hello' );
		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );

		userEvent.click( bobScreen.getByRole( 'document' ) );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'hello' );
		expect( bobScreen.getByTitle( 'Alice' ) ).toHaveTextContent( 'o' ); // peer caret

		userEvent.keyboard( 'world' );

		expect( aliceScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'helloworld' );
		expect( bobScreen.getByRole( 'document', { name: 'Paragraph block' } ) ).toHaveTextContent( 'helloworld' );

		expect( aliceScreen.getByTitle( 'Bob' ) ).toHaveTextContent( 'd' ); // peer caret

		expect( onSave1 ).toHaveBeenLastCalledWith(
			'<!-- wp:paragraph -->\n<p>helloworld</p>\n<!-- /wp:paragraph -->'
		);
		expect( onSave2 ).toHaveBeenLastCalledWith(
			'<!-- wp:paragraph -->\n<p>helloworld</p>\n<!-- /wp:paragraph -->'
		);
	} );

	it( 'should work with initial onLoad content', async () => {
		const [ transport1, transport2 ] = getTransports( 2 );
		await act( async () => {
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
		} );

		const aliceScreen = within( screen.getByTestId( 'alice' ) );
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
