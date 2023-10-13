// @ts-nocheck
/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose, useResizeObserver } from '@wordpress/compose';
import { ErrorBoundary } from '@wordpress/editor';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import ClickOutsideWrapper from './click-outside';
import BlockEditorContents from '../block-editor-contents';
import HotSwapper from './hot-swapper';
import './style.scss';

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnError} OnError */
/** @typedef {import('../../index').OnMore} OnMore */
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').OnLoad} OnLoad */
/** @typedef {import('../block-editor-contents/index').OnUpdate} OnUpdate */

/**
 * Set editing callback
 *
 * @callback OnSetEditing
 * @param {boolean} isEditing
 */

const SIZE_LARGE = 720;
const SIZE_MEDIUM = 480;

/**
 * Contains the block contents. Handles the hot-swapping of the redux stores, as well as applying the root CSS classes
 *
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @param {boolean} props.isEditorReady - The editor is ready for editing
 * @param {boolean} props.isEditing - This editor is being edited in
 * @param {boolean} props.isPreview - Whether preview mode is enabled
 * @param {boolean} props.fixedToolbar - Has fixed toolbar
 * @param {EditorMode} props.editorMode - 'text' or 'visual'
 * @param {string} props.className - additional class names
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnError} props.onError - Error callback
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSetEditing} props.setEditing - Set the mode to editing
 * @param {OnLoad} props.onLoad - Load initial blocks
 * @param {OnUpdate} [props.onInput] - Gutenberg's onInput callback
 * @param {OnUpdate} [props.onChange] - Gutenberg's onChange callback
 * @param {object[]} [props.blocks] - Gutenberg's blocks
 */
function BlockEditorContainer( props ) {
	const { children, settings, className, onError, renderMoreMenu, onLoad, onInput, onChange, blocks } = props;
	const { isEditorReady, editorMode, isEditing, setEditing, fixedToolbar, isPreview } = props;
	const [ resizeListener, { width } ] = useResizeObserver();
	const classes = classnames( className, {
		'iso-editor': true,

		'is-large': width ? width >= SIZE_LARGE : false,
		'is-medium': width ? width >= SIZE_MEDIUM && width < SIZE_LARGE : true,
		'is-small': width ? width < SIZE_MEDIUM : false,

		'iso-editor__loading': ! isEditorReady,
		'iso-editor__selected': isEditing,

		// Match Gutenberg
		'block-editor': true,
		'edit-post-layout': true,
		'has-fixed-toolbar': fixedToolbar,
		[ 'is-mode-' + editorMode ]: true,
		'is-preview-mode': isPreview,
	} );

	return (
		<div className={ classes }>
			<ErrorBoundary onError={ onError }>
				<HotSwapper />

				{ resizeListener }

				<ClickOutsideWrapper
					onOutside={ () => setEditing( false ) }
					onFocus={ () => ! isEditing && setEditing( true ) }
				>
					<BlockEditorContents
						blocks={ blocks }
						settings={ settings }
						renderMoreMenu={ renderMoreMenu }
						onLoad={ onLoad }
						onInput={ onInput }
						onChange={ onChange }
					>
						{ children }
					</BlockEditorContents>
				</ClickOutsideWrapper>
			</ErrorBoundary>
		</div>
	);
}

export default compose( [
	withSelect( ( select, { settings } ) => {
		const { isEditorReady, getEditorMode, isEditing, isFeatureActive, isOptionActive } = select(
			'isolated/editor'
		);

		return {
			isEditorReady: isEditorReady(),
			editorMode: getEditorMode(),
			isEditing: isEditing(),
			fixedToolbar: isFeatureActive( 'fixedToolbar', settings?.editor.hasFixedToolbar ),
			isPreview: isOptionActive( 'preview' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { setEditing } = dispatch( 'isolated/editor' );

		return {
			setEditing,
		};
	} ),
] )( BlockEditorContainer );
