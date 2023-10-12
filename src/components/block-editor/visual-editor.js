/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	WritingFlow,
	BlockList,
	BlockTools,
	store as blockEditorStore,
	__unstableUseBlockSelectionClearer as useBlockSelectionClearer,
	__unstableUseTypewriter as useTypewriter,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	__experimentalUseResizeCanvas as useResizeCanvas,
	__unstableEditorStyles as EditorStyles,
	useSetting,
	__unstableUseMouseMoveTypingReset as useMouseMoveTypingReset,
	__unstableIframe as Iframe,
	__experimentalRecursionProvider as RecursionProvider,
	privateApis as blockEditorPrivateApis,
} from '@wordpress/block-editor';
import {
	VisualEditorGlobalKeyboardShortcuts,
	store as editorStore,
} from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { __unstableMotion as motion } from '@wordpress/components';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { useMergeRefs } from '@wordpress/compose';
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';

/**
 * Internal dependencies
 */
import EditorHeading from '../editor-heading-slot';
import FooterSlot from '../footer-slot';

export const { lock, unlock } = __dangerousOptInToUnstableAPIsOnlyForCoreModules(
	'I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.',
	'@wordpress/edit-post'
);

const { LayoutStyle, useLayoutClasses, useLayoutStyles } = unlock( blockEditorPrivateApis );

function MaybeIframe( { children, contentRef, shouldIframe, styles, style } ) {
	const ref = useMouseMoveTypingReset();

	if ( !shouldIframe ) {
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
			ref={ ref }
			contentRef={ contentRef }
			style={ { width: '100%', height: '100%', display: 'block' } }
			name="editor-canvas"
		>
			<EditorStyles styles={ styles } />
			{ children }
		</Iframe>
	);
}

/**
 * This is a copy of packages/edit-post/src/components/visual-editor/index.js
 *
 * The original is not exported, and contains code for post titles
 *
 * @param {Object} args
 * @param args.styles
 */
export default function VisualEditor( { styles } ) {
	const {
		deviceType,
		isWelcomeGuideVisible,
		isTemplateMode,
		postContentAttributes,
		editedPostTemplate = {},
		wrapperBlockName,
		wrapperUniqueId,
	} = useSelect( ( select ) => {
		const {
			isFeatureActive,
		} = select( 'isolated/editor' );
		// @ts-ignore
		const { getCurrentPostId, getCurrentPostType, getEditorSettings } =
			select( editorStore );
		const _isTemplateMode = false;
		let _wrapperBlockName;

		if ( getCurrentPostType() === 'wp_block' ) {
			_wrapperBlockName = 'core/block';
		} else if ( !_isTemplateMode ) {
			_wrapperBlockName = 'core/post-content';
		}

		const editorSettings = getEditorSettings();

		return {
			deviceType: 'Desktop',
			// @ts-ignore
			isWelcomeGuideVisible: isFeatureActive( 'welcomeGuide' ),
			isTemplateMode: _isTemplateMode,
			postContentAttributes: getEditorSettings().postContentAttributes,
			// Post template fetch returns a 404 on classic themes, which
			// messes with e2e tests, so check it's a block theme first.
			editedPostTemplate: undefined,
			wrapperBlockName: _wrapperBlockName,
			wrapperUniqueId: getCurrentPostId(),
			isBlockBasedTheme: editorSettings.__unstableIsBlockBasedTheme,
		};
	}, [] );
	// @ts-ignore
	const { isCleanNewPost } = useSelect( editorStore );
	const hasMetaBoxes = false;
	const { themeHasDisabledLayoutStyles, themeSupportsLayout } =
		useSelect( ( select ) => {
			// @ts-ignore
			const _settings = select( blockEditorStore ).getSettings();
			return {
				themeHasDisabledLayoutStyles: _settings.disableLayoutStyles,
				themeSupportsLayout: _settings.supportsLayout,
				isFocusMode: _settings.focusMode,
			};
		}, [] );
	const desktopCanvasStyles = {
		height: '100%',
		width: '100%',
		margin: 0,
		display: 'flex',
		flexFlow: 'column',
		// Default background color so that grey
		// .edit-post-editor-regions__content color doesn't show through.
		background: 'white',
	};
	const templateModeStyles = {
		...desktopCanvasStyles,
		borderRadius: '2px 2px 0 0',
		border: '1px solid #ddd',
		borderBottom: 0,
	};
	const resizedCanvasStyles = useResizeCanvas( deviceType, isTemplateMode );
	const globalLayoutSettings = useSetting( 'layout' );
	const previewMode = 'is-' + deviceType.toLowerCase() + '-preview';

	let animatedStyles = isTemplateMode
		? templateModeStyles
		: desktopCanvasStyles;
	if ( resizedCanvasStyles ) {
		animatedStyles = resizedCanvasStyles;
	}

	let paddingBottom;

	// Add a constant padding for the typewritter effect. When typing at the
	// bottom, there needs to be room to scroll up.
	if ( !hasMetaBoxes && !resizedCanvasStyles && !isTemplateMode ) {
		paddingBottom = '40vh';
	}

	const ref = useRef();
	const contentRef = useMergeRefs( [
		ref,
		useClipboardHandler(),
		useTypewriter(),
		useTypingObserver(),
		useBlockSelectionClearer(),
	] );

	const blockSelectionClearerRef = useBlockSelectionClearer();

	// fallbackLayout is used if there is no Post Content,
	// and for Post Title.
	const fallbackLayout = useMemo( () => {
		if ( isTemplateMode ) {
			return { type: 'default' };
		}

		if ( themeSupportsLayout ) {
			// We need to ensure support for wide and full alignments,
			// so we add the constrained type.
			return { ...globalLayoutSettings, type: 'constrained' };
		}
		// Set default layout for classic themes so all alignments are supported.
		return { type: 'default' };
	}, [ isTemplateMode, themeSupportsLayout, globalLayoutSettings ] );

	const newestPostContentAttributes = useMemo( () => {
		// @ts-ignore
		if ( !editedPostTemplate?.content && !editedPostTemplate?.blocks ) {
			return postContentAttributes;
		}
		// When in template editing mode, we can access the blocks directly.
		// @ts-ignore
		if ( editedPostTemplate?.blocks ) {
			// @ts-ignore
			return getPostContentAttributes( editedPostTemplate?.blocks );
		}
		// If there are no blocks, we have to parse the content string.
		// Best double-check it's a string otherwise the parse function gets unhappy.
		// @ts-ignore
		const parseableContent = typeof editedPostTemplate?.content === 'string' ? editedPostTemplate?.content : '';

		// @ts-ignore
		return getPostContentAttributes( parse( parseableContent ) ) || {};
	}, [
		// @ts-ignore
		editedPostTemplate?.content,
		// @ts-ignore
		editedPostTemplate?.blocks,
		postContentAttributes,
	] );

	const layout = newestPostContentAttributes?.layout || {};

	const postContentLayoutClasses = useLayoutClasses(
		newestPostContentAttributes,
		'core/post-content'
	);

	const blockListLayoutClass = classnames(
		{
			'is-layout-flow': !themeSupportsLayout,
		},
		themeSupportsLayout && postContentLayoutClasses
	);

	const postContentLayoutStyles = useLayoutStyles(
		newestPostContentAttributes,
		'core/post-content',
		'.block-editor-block-list__layout.is-root-container'
	);

	// Update type for blocks using legacy layouts.
	const postContentLayout = useMemo( () => {
		return layout &&
			( layout?.type === 'constrained' ||
				layout?.inherit ||
				layout?.contentSize ||
				layout?.wideSize )
			? { ...globalLayoutSettings, ...layout, type: 'constrained' }
			: { ...globalLayoutSettings, ...layout, type: 'default' };
	}, [
		layout?.type,
		layout?.inherit,
		layout?.contentSize,
		layout?.wideSize,
		globalLayoutSettings,
	] );

	// If there is a Post Content block we use its layout for the block list;
	// if not, this must be a classic theme, in which case we use the fallback layout.
	const blockListLayout = postContentAttributes
		? postContentLayout
		: fallbackLayout;

	const titleRef = useRef();
	useEffect( () => {
		if ( isWelcomeGuideVisible || !isCleanNewPost() ) {
			return;
		}
		// @ts-ignore
		titleRef?.current?.focus();
	}, [ isWelcomeGuideVisible, isCleanNewPost ] );

	styles = useMemo(
		() => [
			...styles,
			{
				// We should move this in to future to the body.
				css:
					`.edit-post-visual-editor__post-title-wrapper{margin-top:4rem}` +
					( paddingBottom
						? `body{padding-bottom:${ paddingBottom }}`
						: '' ),
			},
		],
		[ styles ]
	);

	return (
		<BlockTools
			__unstableContentRef={ ref }
			className={ classnames( 'edit-post-visual-editor', {
				'is-template-mode': isTemplateMode,
			} ) }
		>
			<VisualEditorGlobalKeyboardShortcuts />
			<motion.div
				className="edit-post-visual-editor__content-area"
				animate={ {
					padding: isTemplateMode ? '48px 48px 0' : 0,
				} }
				ref={ blockSelectionClearerRef }
			>
				<motion.div
					animate={ animatedStyles }
					initial={ desktopCanvasStyles }
					className={ previewMode }
				>
					<MaybeIframe
						shouldIframe={
							isTemplateMode ||
							deviceType === 'Tablet' ||
							deviceType === 'Mobile'
						}
						contentRef={ contentRef }
						styles={ styles }
						style={ {} }
					>
						{ themeSupportsLayout &&
							!themeHasDisabledLayoutStyles &&
							!isTemplateMode && (
								<>
									<LayoutStyle
										selector=".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container"
										layout={ fallbackLayout }
										layoutDefinitions={
											globalLayoutSettings?.definitions
										}
									/>
									{ postContentLayoutStyles && (
										<LayoutStyle
											layout={ postContentLayout }
											css={ postContentLayoutStyles }
											layoutDefinitions={
												globalLayoutSettings?.definitions
											}
										/>
									) }
								</>
							) }

						<EditorHeading.Slot mode="visual" />

						<RecursionProvider
							blockName={ wrapperBlockName }
							uniqueId={ wrapperUniqueId }
						>
							<BlockList
								className={
									isTemplateMode
										? 'wp-site-blocks'
										: `${ blockListLayoutClass } wp-block-post-content` // Ensure root level blocks receive default/flow blockGap styling rules.
								}
								__experimentalLayout={ blockListLayout }
							/>
						</RecursionProvider>

						<FooterSlot.Slot mode="visual" />
					</MaybeIframe>
				</motion.div>
			</motion.div>
		</BlockTools>
	);
};
