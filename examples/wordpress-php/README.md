# Isolated Block Editor - bundling with WordPress

This helps with setting up WordPress to load Gutenberg on pages outside of the post editor.

It will:
- Load Gutenberg JS and CSS files
- Setup the Gutenberg settings
- Allow third-party blocks to run
- Setup the media library

Some of this setup is copied from WordPress, and may need to be updated.

```php
add_action( 'init', function() {
	$gutenberg = new IsoEditor_Gutenberg();
	$gutenberg->load();
} );
```
