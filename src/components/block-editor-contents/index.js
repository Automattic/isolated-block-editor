/**
 * External dependencies
 */
import { createDocument } from 'asblocks/src/lib/yjs-doc';
import { postDocToObject, updatePostDoc } from 'asblocks/src/components/editor/sync/algorithms/yjs';

/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { parse, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { BlockEditorProvider } from '@wordpress/block-editor';
import BlockEditorToolbar from '../block-editor-toolbar';
import BlockEditor from '../block-editor';
import getInitialEditorContent from './editor-content';

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnLoad} OnLoad */
/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Get editor selection
 * @callback OnSelection
 */

/**
 * Update callback
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 */

function getInitialContent( settings, content ) {
	return getInitialEditorContent(
		settings.iso.patterns,
		settings.iso.currentPattern,
		settings.editor.template,
		content
	);
}

let nextDocId = 1;

function initYDoc( blocks, blocksUpdater ) {
	const id = nextDocId++;
	const doc = createDocument( {
		identity: id,
		applyDataChanges: updatePostDoc,
		getData: postDocToObject,
		sendMessage: ( message ) => window.localStorage.setItem( 'isoEditorYjsMessage', JSON.stringify( message ) ),
	} );

	window.localStorage.setItem(
		'isoEditorClients',
		( parseInt( window.localStorage.getItem( 'isoEditorClients' ) || '0' ) + 1 ).toString()
	);
	doc.id = id;

	window.addEventListener( 'storage', ( event ) => {
		if ( event.storageArea !== localStorage ) return;
		if ( event.key === 'isoEditorYjsMessage' && event.newValue ) {
			doc.receiveMessage( JSON.parse( event.newValue ) );
		}
	} );

	doc.onRemoteDataChange( ( changes ) => {
		console.log( `remotechange received by ${ id }` );
		blocksUpdater( changes.blocks );
	} );

	if ( window.localStorage.getItem( 'isoEditorClients' ) ) {
		doc.startSharing( { title: '', blocks } );
	} else {
		doc.connect();
	}

	return doc;
}

/**
 * The editor itself, including toolbar
 *
 * @param {object} props - Component props
 * @param {object[]} props.blocks
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 * @param {OnUpdate} props.updateBlocksWithUndo - Callback to update blocks
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSelection} props.selection
 * @param {OnLoad} props.onLoad - Load initial blocks
 */
function BlockEditorContents( props ) {
	const { blocks, updateBlocksWithoutUndo, updateBlocksWithUndo, selection, isEditing, editorMode } = props;
	const { children, settings, renderMoreMenu, onLoad } = props;

	// Set initial content, if we have any, but only if there is no existing data in the editor (from elsewhere)
	useEffect( () => {
		const initialContent = getInitialContent( settings, onLoad ? onLoad( parse, rawHandler ) : [] );

		if ( initialContent.length > 0 && ( ! blocks || blocks.length === 0 ) ) {
			updateBlocksWithoutUndo( initialContent );
		}
	}, [] );

	const ydoc = useRef();

	useEffect( () => {
		ydoc.current = initYDoc( blocks, ( blocks ) => updateBlocksWithoutUndo( blocks ) );
	}, [] );

	return (
		<BlockEditorProvider
			value={ blocks || [] }
			onInput={ updateBlocksWithoutUndo }
			onChange={ ( blocks, options ) => {
				updateBlocksWithUndo( blocks, options );
				ydoc.current.applyDataChanges( { blocks } );
			} }
			useSubRegistry={ false }
			selection={ selection }
			settings={ settings.editor }
		>
			<BlockEditorToolbar editorMode={ editorMode } settings={ settings } renderMoreMenu={ renderMoreMenu } />
			<BlockEditor isEditing={ isEditing } editorMode={ editorMode }>
				{ children }
			</BlockEditor>

			<Popover.Slot />
		</BlockEditorProvider>
	);
}

export default compose( [
	withSelect( ( select ) => {
		const { getBlocks, getEditorSelection, getEditorMode, isEditing } = select( 'isolated/editor' );

		return {
			blocks: getBlocks(),
			selection: getEditorSelection(),
			isEditing: isEditing(),
			editorMode: getEditorMode(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { updateBlocksWithUndo, updateBlocksWithoutUndo } = dispatch( 'isolated/editor' );

		return {
			updateBlocksWithUndo,
			updateBlocksWithoutUndo,
		};
	} ),
] )( BlockEditorContents );
