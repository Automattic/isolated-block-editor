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
		expect( consoleIssues ).toHaveLength( 0 );
	},
} );

test.describe( 'Editor content', () => {
	test( 'should allow typing', async ( { page } ) => {
		await page.goto( '?path=/story/isolated-block-editor--default' );
		const iframe = page.frameLocator( '#storybook-preview-iframe' );
		const editorContent = iframe.locator( 'role=region[name="Editor content"]' );
		await editorContent.locator( 'role=button[name=/^Add default/]' ).click();
		await editorContent.locator( 'role=document' ).type( 'Hello' );
		await expect( editorContent.locator( 'role=document' ) ).toHaveText( 'Hello' );
	} );

	test( 'should isolate content between editors', async ( { page } ) => {
		await page.goto( '?path=/story/isolated-block-editor--multiple-editors' );
		const iframe = page.frameLocator( '#storybook-preview-iframe' );
		const alice = iframe.locator( 'role=region[name="Editor content"]' ).nth( 0 );
		const bob = iframe.locator( 'role=region[name="Editor content"]' ).nth( 1 );
		await alice.locator( 'role=button[name=/^Add default/]' ).click();
		await alice.locator( 'role=document' ).type( 'Hello' );
		await bob.locator( 'role=button[name=/^Add default/]' ).click();
		await bob.locator( 'role=document' ).type( 'World' );

		await expect( alice.locator( 'role=document' ) ).toHaveText( 'Hello' );
		await expect( bob.locator( 'role=document' ) ).toHaveText( 'World' );
	} );
} );
