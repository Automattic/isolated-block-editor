/**
 * WordPress dependencies
 */

import { render, unmountComponentAtNode } from '@wordpress/element';
import root from 'react-shadow';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */

import IsolatedBlockEditor from 'isolated-block-editor';
import loadContent from './load';
import saveContent from './save';
import './style.scss';

/** @typedef {import('isolated-block-editor').BlockEditorSettings} BlockEditorSettings */

/**
 * These are the Gutenberg and IsolatedBlockEditor settings. Everything not set uses the defaults.
 *
 * @type BlockEditorSettings
 */
const settings = {
	iso: {
		moreMenu: false,
	},
};

function getExisting( textarea ) {
	const wrappers = [ '.wp-editor-container', '.post-editor' ];

	for ( let index = 0; index < wrappers.length; index++ ) {
		const wrapper = textarea.closest( wrappers[ index ] );

		if ( wrapper ) {
			return wrapper;
		}
	}

	return textarea;
}

function ShadowCSS() {
	useEffect( () => {
		const linkElem = document.createElement( 'link' );

		linkElem.setAttribute( 'rel', 'stylesheet' );
		linkElem.setAttribute( 'href', chrome.runtime.getURL( 'build/gutenberg-everywhere.css' ) );

		document.querySelector( '.gutenberg-everywhere' ).shadowRoot.appendChild( linkElem );

		setTimeout( () => {
			document.querySelector( '.gutenberg-everywhere' ).classList.remove( 'gutenberg-everywhere__loading' );
		}, 100 );
	}, [] );
	return null;
}

/**
 * Attach IsolatedBlockEditor to a textarea
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
function attachEditor( textarea ) {
	// Check it's a textarea
	if ( textarea.type.toLowerCase() !== 'textarea' ) {
		return;
	}

	// Create a node
	const editor = document.createElement( 'div' );
	editor.classList.add( 'editor' );

	// Figure out where to insert it
	const existing = getExisting( textarea );

	// Insert it and hide the old textarea
	existing.parentNode.insertBefore( editor, existing.nextSibling );
	existing.style.display = 'none';

	// Mark this as in-use
	textarea.dataset.gutenberg = true;

	// Render the editor
	render(
		<IsolatedBlockEditor
			settings={ settings }
			onLoad={ ( parser, rawHandler ) => loadContent( textarea.value, parser, rawHandler ) }
			onSaveContent={ ( content ) => saveContent( content, textarea ) }
			onError={ () => document.location.reload() }
		></IsolatedBlockEditor>,
		editor
	);

	/*
	render(
		<root.div className="gutenberg-everywhere gutenberg-everywhere__loading">
			<IsolatedBlockEditor
				settings={ settings }
				onLoad={ ( parser, rawHandler ) => loadContent( textarea.value, parser, rawHandler ) }
				onSaveContent={ ( content ) => saveContent( content, textarea ) }
				onError={ () => document.location.reload() }
			>
				<ShadowCSS />
			</IsolatedBlockEditor>
		</root.div>,
		editor
	);
*/
}

/**
 * Remove IsolatedBlockEditor from a textarea node
 * @param {HTMLTextAreaElement} textarea Textarea node
 */
function detachEditor( textarea ) {
	/**
	 * @type {HTMLElement}
	 */
	const editor = textarea.nextSibling;

	if ( editor && editor.classList.contains( 'editor' ) ) {
		unmountComponentAtNode( editor );
		textarea.style.display = null;
		delete textarea.dataset.gutenberg;
		editor.parentNode.removeChild( editor );
	}
}

function canChange( area ) {
	if ( area.disabled || area.style.display === 'none' ) {
		return false;
	}

	// Github
	if ( area.name === 'issue[body]' ) {
		return false;
	}

	return true;
}

function gutenbergEverywhereRun() {
	const textareas = document.querySelectorAll( 'textarea' );

	textareas.forEach( ( area ) => {
		if ( area.dataset.gutenberg !== undefined ) {
			detachEditor( area );
		} else if ( canChange( area ) ) {
			attachEditor( area );
		}
	} );
}

chrome.runtime.onMessage.addListener( ( message ) => {
	if ( message && message.type === 'TOGGLE_GUTENBERG' ) {
		gutenbergEverywhereRun( message.enabled );
	}
} );
