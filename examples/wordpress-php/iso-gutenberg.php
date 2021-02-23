<?php

/**
 * Provides functions to load Gutenberg assets
 */
class IsoEditor_Gutenberg {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'template_redirect', [ $this, 'setup_media' ] );
		add_filter( 'block_editor_settings', [ $this, 'block_editor_settings' ] );
	}

	/**
	 * Load Gutenberg
	 *
	 * Based on wp-admin/edit-form-blocks.php
	 *
	 * @return void
	 */
	public function load() {
		$this->load_extra_blocks();

		// Gutenberg scripts
		wp_enqueue_script( 'wp-block-library' );
		wp_enqueue_script( 'wp-format-library' );
		wp_enqueue_script( 'wp-editor' );

		// Gutenberg styles
		wp_enqueue_style( 'wp-edit-post' );
		wp_enqueue_style( 'wp-format-library' );

		// Keep Jetpack out of things
		add_filter(
			'jetpack_blocks_variation',
			function() {
				return 'no-post-editor';
			}
		);

		wp_tinymce_inline_scripts();
		wp_enqueue_editor();

		do_action( 'enqueue_block_editor_assets' );

		add_action( 'wp_print_footer_scripts', array( '_WP_Editors', 'print_default_editor_scripts' ), 45 );

		$this->setup_rest_api();
	}

	/**
	 * Load any third-party blocks
	 *
	 * @return void
	 */
	private function load_extra_blocks() {
		// phpcs:ignore
		$GLOBALS['hook_suffix'] = '';

		/**
		 * @psalm-suppress MissingFile
		 */
		require_once ABSPATH . 'wp-admin/includes/class-wp-screen.php';
		/**
		 * @psalm-suppress MissingFile
		 */
		require_once ABSPATH . 'wp-admin/includes/screen.php';
		/**
		 * @psalm-suppress MissingFile
		 */
		require_once ABSPATH . 'wp-admin/includes/post.php';

		// Fake a WP_Screen object so we can pretend we're in the block editor, and therefore other block libraries load
		set_current_screen();

		$current_screen = get_current_screen();
		if ( $current_screen ) {
			$current_screen->is_block_editor( true );
		}
	}

	/**
	 * Override some features that probably don't make sense in an isolated editor
	 *
	 * @param array $settings Settings array.
	 * @return array
	 */
	public function block_editor_settings( array $settings ) {
		$settings['availableLegacyWidgets'] = (object) [];
		$settings['hasPermissionsToManageWidgets'] = false;

		// Start with no patterns
		$settings['__experimentalBlockPatterns'] = [];

		return $settings;
	}

	/**
	 * Set up Gutenberg editor settings
	 *
	 * @return Array
	 */
	public function get_editor_settings() {
		// This is copied from core
		// phpcs:disable
		global $editor_styles, $post;

		wp_add_inline_script(
			'wp-blocks',
			sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( get_block_categories( $post ) ) ),
			'after'
		);

		$align_wide    = get_theme_support( 'align-wide' );
		$color_palette = current( (array) get_theme_support( 'editor-color-palette' ) );
		$font_sizes    = current( (array) get_theme_support( 'editor-font-sizes' ) );

		$max_upload_size = wp_max_upload_size();
		if ( ! $max_upload_size ) {
			$max_upload_size = 0;
		}

		// Editor Styles.
		$styles = array(
			array(
				'css' => file_get_contents(
					ABSPATH . WPINC . '/css/dist/editor/editor-styles.css'
				),
			),
		);

		$locale_font_family = esc_html_x( 'Noto Serif', 'CSS Font Family for Editor Font' );
		$styles[]           = array(
			'css' => "body { font-family: '$locale_font_family' }",
		);

		if ( $editor_styles && current_theme_supports( 'editor-styles' ) ) {
			foreach ( $editor_styles as $style ) {
				if ( preg_match( '~^(https?:)?//~', $style ) ) {
					$response = wp_remote_get( $style );
					if ( ! is_wp_error( $response ) ) {
						$styles[] = array(
							'css' => wp_remote_retrieve_body( $response ),
						);
					}
				} else {
					$file = get_theme_file_path( $style );
					if ( is_file( $file ) ) {
						$styles[] = array(
							'css'     => file_get_contents( $file ),
							'baseURL' => get_theme_file_uri( $style ),
						);
					}
				}
			}
		}

		$image_size_names = apply_filters(
			'image_size_names_choose',
			array(
				'thumbnail' => __( 'Thumbnail' ),
				'medium'    => __( 'Medium' ),
				'large'     => __( 'Large' ),
				'full'      => __( 'Full Size' ),
			)
		);

		$available_image_sizes = array();
		foreach ( $image_size_names as $image_size_slug => $image_size_name ) {
			$available_image_sizes[] = array(
				'slug' => $image_size_slug,
				'name' => $image_size_name,
			);
		}

		/**
		 * @psalm-suppress TooManyArguments
		 */
		$body_placeholder = apply_filters( 'write_your_story', __( 'Start writing or type / to choose a block' ), $post );
		$allowed_block_types = apply_filters( 'allowed_block_types', true, $post );

		/**
		 * @psalm-suppress TooManyArguments
		 */
		$editor_settings = array(
			'alignWide'              => $align_wide,
			'disableCustomColors'    => get_theme_support( 'disable-custom-colors' ),
			'disableCustomFontSizes' => get_theme_support( 'disable-custom-font-sizes' ),
			'disablePostFormats'     => ! current_theme_supports( 'post-formats' ),
			/** This filter is documented in wp-admin/edit-form-advanced.php */
			'titlePlaceholder'       => apply_filters( 'enter_title_here', __( 'Add title' ), $post ),
			'bodyPlaceholder'        => $body_placeholder,
			'isRTL'                  => is_rtl(),
			'autosaveInterval'       => AUTOSAVE_INTERVAL,
			'maxUploadFileSize'      => $max_upload_size,
			'allowedMimeTypes'       => [],
			'styles'                 => $styles,
			'imageSizes'             => $available_image_sizes,
			'richEditingEnabled'     => user_can_richedit(),
			'codeEditingEnabled'     => false,
			'allowedBlockTypes'      => $allowed_block_types,
			'__experimentalCanUserUseUnfilteredHTML' => false,
			'__experimentalBlockPatterns' => [],
			'__experimentalBlockPatternCategories' => [],
		);

		if ( false !== $color_palette ) {
			$editor_settings['colors'] = $color_palette;
		}

		if ( false !== $font_sizes ) {
			$editor_settings['fontSizes'] = $font_sizes;
		}

		/**
		 * @psalm-suppress TooManyArguments
		 */
		return apply_filters( 'block_editor_settings', $editor_settings, $post );
		// phpcs:enable
	}

	/**
	 * Set up the Gutenberg REST API and preloaded data
	 *
	 * @return void
	 */
	public function setup_rest_api() {
		global $post;

		$post_type = 'post';

		// Preload common data.
		$preload_paths = array(
			'/',
			'/wp/v2/types?context=edit',
			'/wp/v2/taxonomies?per_page=-1&context=edit',
			'/wp/v2/themes?status=active',
			sprintf( '/wp/v2/types/%s?context=edit', $post_type ),
			sprintf( '/wp/v2/users/me?post_type=%s&context=edit', $post_type ),
			array( '/wp/v2/media', 'OPTIONS' ),
			array( '/wp/v2/blocks', 'OPTIONS' ),
		);

		/**
		 * @psalm-suppress TooManyArguments
		 */
		$preload_paths = apply_filters( 'block_editor_preload_paths', $preload_paths, $post );
		$preload_data = array_reduce( $preload_paths, 'rest_preload_api_request', array() );

		$encoded = wp_json_encode( $preload_data );
		if ( $encoded !== false ) {
			wp_add_inline_script(
				'wp-editor',
				sprintf( 'wp.apiFetch.use( wp.apiFetch.createPreloadingMiddleware( %s ) );', $encoded ),
				'after'
			);
		}
	}

	/**
	 * Ensure media works in Gutenberg
	 *
	 * @return void
	 */
	public function setup_media() {
		/**
		 * @psalm-suppress MissingFile
		 */
		require_once ABSPATH . 'wp-admin/includes/media.php';

		wp_enqueue_media();
	}
}
