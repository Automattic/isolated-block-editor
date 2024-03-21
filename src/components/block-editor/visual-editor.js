/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	BlockList,
	BlockTools,
	store as blockEditorStore,
	__unstableUseTypewriter as useTypewriter,
	__experimentalUseResizeCanvas as useResizeCanvas,
	useSetting,
	__experimentalRecursionProvider as RecursionProvider,
	privateApis as blockEditorPrivateApis,
// @ts-ignore
} from '@wordpress/block-editor';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { __unstableMotion as motion } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMergeRefs } from '@wordpress/compose';
// @ts-ignore
import { parse, store as blocksStore } from '@wordpress/blocks';
// @ts-ignore
import { store as editorStore } from '@wordpress/editor';

// @ts-ignore
const isGutenbergPlugin = true;

/**
 * Internal dependencies
 */
import EditorHeading from '../editor-heading-slot';
import FooterSlot from '../footer-slot';
import { unlock } from './unlock';


const {
	LayoutStyle,
	useLayoutClasses,
	useLayoutStyles,
	ExperimentalBlockCanvas: BlockCanvas,
} = unlock( blockEditorPrivateApis );

/**
 * Given an array of nested blocks, find the first Post Content
 * block inside it, recursing through any nesting levels,
 * and return its attributes.
 *
 * @param {Array} blocks A list of blocks.
 *
 * @return {Object | undefined} The Post Content block.
 */
function getPostContentAttributes( blocks ) {
	for ( let i = 0; i < blocks.length; i++ ) {
		if ( blocks[ i ].name === 'core/post-content' ) {
			return blocks[ i ].attributes;
		}
		if ( blocks[ i ].innerBlocks.length ) {
			const nestedPostContent = getPostContentAttributes(
				blocks[ i ].innerBlocks
			);

			if ( nestedPostContent ) {
				return nestedPostContent;
			}
		}
	}
}

function checkForPostContentAtRootLevel( blocks ) {
	for ( let i = 0; i < blocks.length; i++ ) {
		if ( blocks[ i ].name === 'core/post-content' ) {
			return true;
		}
	}
	return false;
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
		// @ts-ignore
		isBlockBasedTheme,
		// @ts-ignore
		hasV3BlocksOnly,
	} = useSelect( ( select ) => {
		const {
			isFeatureActive,
		} = select( 'isolated/editor' );
		const { getCurrentPostId, getCurrentPostType, getEditorSettings } =
			select( editorStore );
		const { getBlockTypes } = select( blocksStore );
		const _isTemplateMode = false;
		const postTypeSlug = getCurrentPostType();
		let _wrapperBlockName;

		if ( postTypeSlug === 'wp_block' ) {
			_wrapperBlockName = 'core/block';
		} else if ( ! _isTemplateMode ) {
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
			hasV3BlocksOnly: getBlockTypes().every( ( type ) => {
				return type.apiVersion >= 3;
			} ),
		};
	}, [] );
	// @ts-ignore
	const { isCleanNewPost } = useSelect( editorStore );
	const hasMetaBoxes = false;
	const {
		themeHasDisabledLayoutStyles,
		themeSupportsLayout,
	} = useSelect( ( select ) => {
		const _settings = select( blockEditorStore ).getSettings();
		return {
			themeHasDisabledLayoutStyles: _settings.disableLayoutStyles,
			themeSupportsLayout: _settings.supportsLayout,
			isFocusMode: _settings.focusMode,
			hasRootPaddingAwareAlignments:
				_settings.__experimentalFeatures?.useRootPaddingAwareAlignments,
		};
	}, [] );
	const desktopCanvasStyles = {
		height: '100%',
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
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
	if ( ! hasMetaBoxes && ! resizedCanvasStyles && ! isTemplateMode ) {
		paddingBottom = '40vh';
	}

	const ref = useRef();
	const contentRef = useMergeRefs( [ ref, useTypewriter() ] );

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
		if ( ! editedPostTemplate?.content && ! editedPostTemplate?.blocks ) {
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
		const parseableContent =
			// @ts-ignore
			typeof editedPostTemplate?.content === 'string'
				// @ts-ignore
				? editedPostTemplate?.content
				: '';

		// @ts-ignore
		return getPostContentAttributes( parse( parseableContent ) ) || {};
	}, [
		// @ts-ignore
		editedPostTemplate?.content,
		// @ts-ignore
		editedPostTemplate?.blocks,
		postContentAttributes,
	] );

	const hasPostContentAtRootLevel = useMemo( () => {
		// @ts-ignore
		if ( ! editedPostTemplate?.content && ! editedPostTemplate?.blocks ) {
			return false;
		}
		// When in template editing mode, we can access the blocks directly.
		// @ts-ignore
		if ( editedPostTemplate?.blocks ) {
			// @ts-ignore
			return checkForPostContentAtRootLevel( editedPostTemplate?.blocks );
		}
		// If there are no blocks, we have to parse the content string.
		// Best double-check it's a string otherwise the parse function gets unhappy.
		const parseableContent =
			// @ts-ignore
			typeof editedPostTemplate?.content === 'string'
				// @ts-ignore
				? editedPostTemplate?.content
				: '';

		return (
			checkForPostContentAtRootLevel( parse( parseableContent ) ) || false
		);
	// @ts-ignore
	}, [ editedPostTemplate?.content, editedPostTemplate?.blocks ] );

	const { layout = {}, align = '' } = newestPostContentAttributes || {};

	const postContentLayoutClasses = useLayoutClasses(
		newestPostContentAttributes,
		'core/post-content'
	);

	const blockListLayoutClass = classnames(
		{
			'is-layout-flow': ! themeSupportsLayout,
		},
		themeSupportsLayout && postContentLayoutClasses,
		align && `align${ align }`
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

	const postEditorLayout =
		blockListLayout?.type === 'default' && ! hasPostContentAtRootLevel
			? fallbackLayout
			: blockListLayout;

	const titleRef = useRef();
	useEffect( () => {
		if ( isWelcomeGuideVisible || ! isCleanNewPost() ) {
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

	// Add some styles for alignwide/alignfull Post Content and its children.
	const alignCSS = `.is-root-container.alignwide { max-width: var(--wp--style--global--wide-size); margin-left: auto; margin-right: auto;}
		.is-root-container.alignwide:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: var(--wp--style--global--wide-size);}
		.is-root-container.alignfull { max-width: none; margin-left: auto; margin-right: auto;}
		.is-root-container.alignfull:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: none;}`;

	// TODO: Styles not appearing in the iframe mode yet
	// const isToBeIframed =
	// 	( ( hasV3BlocksOnly || ( isGutenbergPlugin && isBlockBasedTheme ) ) &&
	// 		! hasMetaBoxes ) ||
	// 	isTemplateMode ||
	// 	deviceType === 'Tablet' ||
	// 	deviceType === 'Mobile';
	const isToBeIframed = false;

	return (
		<BlockTools
			__unstableContentRef={ ref }
			className={ classnames( 'edit-post-visual-editor', {
				'is-template-mode': isTemplateMode,
				'has-inline-canvas': ! isToBeIframed,
			} ) }
		>
			<motion.div
				className="edit-post-visual-editor__content-area"
				animate={ {
					padding: isTemplateMode ? '48px 48px 0' : 0,
				} }
			>
				<motion.div
					animate={ animatedStyles }
					initial={ desktopCanvasStyles }
					className={ previewMode }
				>
					<BlockCanvas
						shouldIframe={ isToBeIframed }
						contentRef={ contentRef }
						styles={ styles }
						height="100%"
					>
						{ themeSupportsLayout &&
							! themeHasDisabledLayoutStyles &&
							! isTemplateMode && (
								<>
									<LayoutStyle
										selector=".edit-post-visual-editor__post-title-wrapper"
										layout={ fallbackLayout }
									/>
									<LayoutStyle
										selector=".block-editor-block-list__layout.is-root-container"
										layout={ postEditorLayout }
									/>
									{ align && (
										<LayoutStyle css={ alignCSS } />
									) }
									{ postContentLayoutStyles && (
										<LayoutStyle
											layout={ postContentLayout }
											css={ postContentLayoutStyles }
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
								layout={ blockListLayout }
							/>
						</RecursionProvider>

						<FooterSlot.Slot mode="visual" />
					</BlockCanvas>
				</motion.div>
			</motion.div>
		</BlockTools>
	);
}
