/**
 * External dependencies
 */
import { test as base, expect } from '@playwright/test';

const test = base.extend( {
	page: async ( { page }, use ) => {
		// Assert no console errors/warnings
		const consoleIssues = [];
		page.on( 'console', ( msg ) => {
			if ( [ 'error', 'warning' ].includes( msg.type() ) ) {
				consoleIssues.push( `[${ msg.type() }] ${ msg.text() }` );
			}
		} );
		await use( page );
		// TODO: re-enable
		//expect( consoleIssues ).toHaveLength( 0 );
	},
} );

test.describe( 'Editor content', () => {
	test( 'should allow typing', async ( { page } ) => {
		await page.goto( '?path=/story/isolated-block-editor--default' );
		const iframe = await page.frameLocator( '#storybook-preview-iframe' );
		await iframe.locator( '[aria-label="Add default block"]' ).focus();
		await iframe.locator( '[aria-label="Empty block; start writing or type forward slash to choose a block"]' ).type( 'Hello' );
		await expect( iframe.getByRole( 'document' ).nth( 1 ) ).toHaveText( 'Hello' );
	} );

	test( 'should isolate content between editors', async ( { page } ) => {
		await page.goto( '?path=/story/isolated-block-editor--multiple-editors' );
		const iframe = page.frameLocator( '#storybook-preview-iframe' );
		const alice = iframe.locator( '[aria-label="Editor content"]' ).nth( 0 );
		const bob = iframe.locator( '[aria-label="Editor content"]' ).nth( 1 );
		const aliceTextBlock = alice.locator( '[aria-label="Add default block"]' );
		await aliceTextBlock.click();
		await iframe.locator( '[aria-label="Empty block; start writing or type forward slash to choose a block"]' ).type( 'Hello' );

		const bobTextBlock = bob.locator( '[aria-label="Add default block"]' );
		await bobTextBlock.click();
		await iframe.locator( '[aria-label="Empty block; start writing or type forward slash to choose a block"]' ).type( 'World' );
		await expect( alice.locator( 'role=document' ) ).toHaveText( 'Hello' );
		await expect( bob.locator( 'role=document' ) ).toHaveText( 'World' );
	} );
} );
