/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import {
	BlockList,
	WritingFlow,
	store as blockEditorStore,
	useSetting,
	__unstableEditorStyles as EditorStyles,
	__experimentalLayoutStyle as LayoutStyle,
	__unstableUseBlockSelectionClearer as useBlockSelectionClearer,
	__unstableUseTypewriter as useTypewriter,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	__experimentalBlockSettingsMenuFirstItem,
	__experimentalUseResizeCanvas as useResizeCanvas,
	__unstableUseMouseMoveTypingReset as useMouseMoveTypingReset,
	__unstableIframe as Iframe,
	BlockTools,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __unstableMotion as motion } from '@wordpress/components';
import { useRef, useMemo } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';

function MaybeIframe( { children, contentRef, shouldIframe, styles, style } ) {
	const ref = useMouseMoveTypingReset();

	if ( ! shouldIframe ) {
		// TODO: this will add an EditorStyles for each editor on the page, which includes adding a <style> element. probably harmless but something to keep an eye on
		return (
			<>
				<EditorStyles styles={ styles } />
				<WritingFlow
					ref={ contentRef }
					className="editor-styles-wrapper"
					style={ { flex: '1', ...style } }
					tabIndex={ -1 }
				>
					{ children }
				</WritingFlow>
			</>
		);
	}

	return (
		<Iframe
			head={ <EditorStyles styles={ styles } /> }
			ref={ ref }
			contentRef={ contentRef }
			style={ { width: '100%', height: '100%', display: 'block' } }
			name="editor-canvas"
		>
			{ children }
		</Iframe>
	);
}

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param root0
 * @param root0.styles
 */
const VisualEditor = ( { styles } ) => {
	const themeSupportsLayout = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		return getSettings().supportsLayout;
	}, [] );
	const { deviceType } = useSelect( ( select ) => {
		return {
			deviceType: select( 'isolated/editor' ).getPreviewDeviceType(),
		};
	} );
	const resizedCanvasStyles = useResizeCanvas( deviceType, false );
	const defaultLayout = useSetting( 'layout' );
	const previewMode = 'is-' + deviceType.toLowerCase() + '-preview';

	const desktopCanvasStyles = {
		// We intentionally omit a 100% height here. The container is a flex item, so the 100% height is granted by default.
		// If a percentage height is present, older browsers such as Safari 13 apply that, but do so incorrectly as the inheritance is buggy.
		width: '100%',
		margin: 0,
		display: 'flex',
		flexFlow: 'column',
		// Default background color so that grey
		// .edit-post-editor-regions__content color doesn't show through.
		background: 'white',
	};
	let animatedStyles = desktopCanvasStyles;
	if ( resizedCanvasStyles ) {
		animatedStyles = resizedCanvasStyles;
	}

	const blockSelectionClearerRef = useBlockSelectionClearer();
	const ref = useRef();
	const contentRef = useMergeRefs( [
		ref,
		useClipboardHandler(),
		useTypewriter(),
		useBlockSelectionClearer(),
		useTypingObserver(),
	] );

	const layout = useMemo( () => {
		if ( themeSupportsLayout ) {
			return defaultLayout;
		}

		return undefined;
	}, [ themeSupportsLayout, defaultLayout ] );

	return (
		<BlockTools __unstableContentRef={ ref } className="edit-post-visual-editor">
			<motion.div
				className="edit-post-visual-editor__content-area"
				animate={ {
					padding: '0',
				} }
				ref={ blockSelectionClearerRef }
			>
				<motion.div animate={ animatedStyles } initial={ desktopCanvasStyles } className={ previewMode }>
					<MaybeIframe
						shouldIframe={ deviceType === 'Tablet' || deviceType === 'Mobile' }
						contentRef={ contentRef }
						styles={ styles }
						style={ {} }
					>
						<LayoutStyle
							selector=".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container"
							layout={ defaultLayout }
						/>
						<BlockList className={ undefined } __experimentalLayout={ layout } />
					</MaybeIframe>
				</motion.div>
			</motion.div>
		</BlockTools>
	);
};

export default VisualEditor;
