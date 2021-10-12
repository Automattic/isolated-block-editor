/**
 * External dependencies
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import IsolatedBlockEditor from '../';

describe( 'IsolatedBlockEditor', () => {
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
} );
