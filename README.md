# Isolated Block Editor

Repackages Gutenberg's editor playground as a full-featured multi-instance editor that does not require WordPress.

The key features are:
- Extends the Gutenberg playground editor to match a full editor
- Allows multiple onscreen instances with seperate data stores and keyboard handlers
- Undo history

And a full list of features:

- Dynamic switching of data stores for compatability with third-party blocks
- Works at sizes smaller than full screen
- Block allow and disallow list, per instance
- Preferences (saved to localStorage) and options (saved to memory), per instance
- Overriding of key Gutenberg store functions
- Patterns, reusable blocks, groups, and template support
- Block inserter in a popover
- Block inspector in a popover
- Built in toolbar with options for displaying a more menu, block inspector, and block buttons
- Fullscreen mode (requires additional CSS)
- Preview mode (requires additional CSS and JS)
- Visual & code editor
- PHP (WordPress) code to load the editor outside of wp-admin
- Menu for custom links
- Re-routing of WordPress API requests

The Isolated Block Editor is provided in three forms:
- ES6 module
- CommonJS module
- Standalone JavaScript file, for inclusion on any browser page

Requires: Gutenberg 13.3.0

Examples:
- [Plain Text Editor](https://github.com/Automattic/isolated-block-editor/blob/trunk/src/browser/README.md) - standalone JS and CSS file that can replace any `textarea` on any page with a full Gutenberg editor
- [Gutenberg Everywhere](https://github.com/Automattic/gutenberg-everywhere/) - a WordPress plugin to add Gutenberg to comments, WP admin pages, bbPress, and BuddyPress
- [Gutenberg Chrome Extension](https://github.com/Automattic/gutenberg-everywhere-chrome/) - a Chrome extension that allows Gutenberg to be used on any page
- [Gutenberg Desktop](https://github.com/Automattic/gutenberg-desktop/) - a desktop editor that supports the loading and saving of HTML and Markdown files
- [P2](https://wordpress.com/p2/) - WordPress as a collaborative workspace (coming soon for self-hosted)
- Editor Block - a block that allows an editor to be added to a page (coming soon)

Do you use this in your own project? Let us know!

## Why would I use this?

Gutenberg already provides a playground which allows it to be used outside of WordPress. This is actually used as the basis for the Isolated Block Editor.

However, it provides a limited set of features, and extending it further into a usable editor can take some effort. For example, it doesn't include any undo history.

The Isolated Block Editor is a full editor that handles a lot of these complexities. It should not be considered a replacement for the Gutenberg playground, but more of an opinionated layer on top.

This should be considered experimental, and subject to changes.

## Bundling and WordPress

The Isolated Block Editor aims to provide an editor that is as isolated from WordPress as possible. However, it can still be used on a WordPress site, and the decision comes down to the bundling:

- Bundled without Gutenberg - if used on a WordPress site then you can use the Gutenberg code already included with WordPress. You will need a working WordPress site, but do not need to include Gutenberg within your editor
- Bundled with Gutenberg - Gutenberg is included within the editor and there is no dependency on WordPress or PHP

Examples are provided for both situations (see [Plain text editor](examples/plain-text-editor/README.md) for bundled and [Gutenberg Everywhere](https://github.com/Automattic/gutenberg-everywhere/) for unbundled).

The key difference is in the Webpack config. If you don't want to bundle Gutenberg with your editor then you can use the `DependencyExtractionWebpackPlugin` plugin:

```js
plugins: [
	new DependencyExtractionWebpackPlugin( { injectPolyfill: true } )
]
```

Alternatively you can use the [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) build system, which automatically runs `DependencyExtractionWebpackPlugin`:

`wp-scripts start`

You can use the provided [`iso-gutenberg.php`](examples/wordpress-php/README.md) file to help when using the IsolatedBlockEditor on a WordPress site. It will load Gutenberg and set up your configuration.

## Standalone Module

You can use the provided `isolated-block-editor.js`, `core.css`, and `isolated-block-editor.css` files on any web page, regardless of whether it is on WordPress. It will provide two global functions which can turn a `textarea` into a block editor. Here's an example:

```js
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="isolated-block-editor.js"></script>
<link rel="stylesheet" href="core.css" />
<link rel="stylesheet" href="isolated-block-editor.css" />

<body>
	<textarea id="editor"></textarea>

	<script>
		wp.attachEditor( document.getElementById( 'editor' ) );
	</script>
</body>

```

Note that you must load React before loading the editor.

You can find an example in [`src/browser/index.html`](src/browser/index.html).

## CSS

If you are using on a WordPress site then WordPress will load the core Gutenberg CSS as part of the [`iso-gutenberg.php`](examples/wordpress-php/README.md) script.

If you are not using on a WordPress site then you will need to load the core CSS yourself. You can either do this by including the following modules and importing directly:

- `@wordpress/components`
- `@wordpress/block-editor`
- `@wordpress/block-library`
- `@wordpress/format-library`

```scss
@import '@wordpress/components/build-style/style.css';
@import '@wordpress/block-editor/build-style/style.css';
@import '@wordpress/block-library/build-style/style.css';
@import '@wordpress/block-library/build-style/editor.css';
@import '@wordpress/block-library/build-style/theme.css';
@import '@wordpress/format-library/build-style/style.css';
```

Alternatively you can directly import the bundled `build-browser/core.css` CSS:

```js
import '@automattic/isolated-block-editor/build-browser/core.css';
```

## Using

The module is currently only available on Github and can be added with:

`npm install @automattic/isolated-block-editor@1.2.0" --save` (where `1.2.0` is the version you want to use)

## Future

The code here deals with two kinds of problems:
- Adding features to the Gutenberg playground - these are already provided by Gutenberg, but are packaged up here for you
- Adding workarounds to Gutenberg - these are situations where Gutenberg doesn't provide a feature, or doesn't export a feature, and so a workaround is needed.

It is hoped that most of the workarounds can be migrated back to Gutenberg so that they are no longer needed. Sometimes these workarounds involve duplicating parts of Gutenberg, which is not ideal. It is possible that the Isolated Block Editor may no longer be needed as a seperate entity.

## Development

If multiple editors are on-screen then the `IsolatedBlockEditor` will ensure that the `wp` global refers to the currently focussed instance. This should make it more compatible with plugins and third-party code that uses the `wp` global.

### Usage

Include the `IsolatedBlockEditor` module and then create an instance:

```js

import IsolatedBlockEditor from '@automattic/isolated-block-editor';

render(
	<IsolatedBlockEditor
		settings={ settings }
		onSaveContent={ ( html ) => saveContent( html ) }
		onLoad={ ( parse ) => loadInitialContent( parse ) }
		onError={ () => document.location.reload() }
	>
	</IsolatedBlockEditor>,
	document.querySelector( '#editor' )
);
```

The `IsolatedBlockEditor` also exports the following support components:

- `EditorLoaded` - Include this to be notified when the editor is loading and has loaded
- `DocumentSection` - Wrap up a component to appear in the document tab of the inspector
- `ToolbarSlot` - Insert content into the toolbar
- `FooterSlot` - Insert content into the footer
- `EditorHeadingSlot` - Insert content at the beginning of the editor area. Suitable for titles.
- `ActionArea` - Insert content into the actions sidebar
- [`CollaborativeEditing`](https://github.com/Automattic/isolated-block-editor/tree/trunk/src/components/collaborative-editing) - Enable real-time collaborative editing

```js

import IsolatedBlockEditor, { EditorLoaded, DocumentSection, ToolbarSlot, CollaborativeEditing } from 'isolated-block-editor';

render(
	<IsolatedBlockEditor
		settings={ settings }
		onSaveContent={ ( html ) => saveContent( html ) }
		onLoad={ ( parse ) => loadInitialContent( parse ) }
		onError={ () => document.location.reload() }
	>
		<EditorLoaded onLoaded={ () => {} } onLoading={ () => {} } />
		<DocumentSection>Extra Information</DocumentSection>
		<CollaborativeEditing settings={ collabSettings } />

		<ToolbarSlot>
			<button>Beep!</button>
		</ToolbarSlot>
	</IsolatedBlockEditor>,
	document.querySelector( '#editor' )
);
```

The following function is also provided:

- `initializeEditor` - Call this to initialize the editor if it needs to be done before being used.

### Props

#### settings

- _iso_ `[object]` - IsolatedBlockEditor settings object
- _iso.preferencesKey_ `[string|null]` - Preferences key. Default to null to disable
- _iso.defaultPreferences_ {object} - Default preferences
- _iso.persistenceKey_ `[string|null]` - Persistence key. Default to null to disable
- _iso.customStores_ `[array]` - Array of store objects, in a form suitable for passing to Gutenberg's `createReduxStore`
- _iso.blocks_ `[object]` - Block restrictions
- _iso.blocks.allowBlocks_ `[string[]]` - list of block names to allow, defaults to none
- _iso.blocks.disallowBlocks_ `[string[]]` - list of block names to disallow, defaults to none
- _iso.disallowEmbed_ `[string[]]`  - List of embed names to remove, defaults to none.
- _iso.toolbar_ `[Object]` - Toolbar settings
- _iso.toolbar.navigation_ `[boolean]` - Enable or disable the toolbar navigation button, defaults to `false`
- _iso.toolbar.undo_ `[boolean]` - Enable or disable the toolbar undo/redo buttons, defaults to `true`
- _iso.toolbar.documentInspector_ `[string|null]` - Set to a string to show as a new tab in the inspector and filled with `DocumentSection`, otherwise defaults to no new tab
- _iso.sidebar_ `[Object]` - Sidebar settings
- _iso.sidebar.inserter_ `[boolean]` - Enable or disable the sidebar block inserter, defaults to `true`
- _iso.sidebar.inspector_ `[boolean]` - Enable or disable the sidebar block inspector, defaults to `false`
- _iso.sidebar.customComponent_ `[function]` - A function returning a custom sidebar component, or null to uses the default sidebar
- _iso.moreMenu_ `[Object]` - More menu settings
- _iso.moreMenu.editor_ `[boolean]` - Enable or disable the editor sub menu (visual/code editing), defaults to `false`
- _iso.moreMenu.fullscreen_ `[boolean]` - Enable or disable the fullscreen option, defaults to `false`
- _iso.moreMenu.preview_ `[boolean]` - Enable or disable the preview option, defaults to `false`
- _iso.moreMenu.topToolbar_ `[boolean]` - Enable or disable the 'top toolbar' option, defaults to `false`
- _iso.linkMenu_ `[array]` - Link menu settings. Array of `title` and `url`, defaults to none
- _iso.currentPattern_ `[string]` - The pattern to start with, defaults to none
- _iso.allowApi_ `[boolean]` - Allow API requests, defaults to `false`

- _editor_ `[object]` - Gutenberg settings object

A settings object that contains all settings for the IsolatedBlockEditor, as well as for Gutenberg. Any settings not provided will use defaults.

The block allow and disallow list works as follows:
- All blocks are allowed, unless the `allowBlocks` option is set which defines the list of allowed blocks
- Anything in the `disallowBlocks` list is removed from the list of allowed blocks.

#### onSaveContent

- _content_ - content to be saved, as an HTML string

Save callback that saves the content as an HTML string. Will be called for each change in the editor content.

#### onSaveBlocks

- _blocks_ `[Array]` - blocks to be saved
- _ignoredContent_ `[Array]`- array of HTML strings of content that can be ignored

Save callback that is supplied with a list of blocks and a list of ignored content. This gives more control than `onSaveContent`, and is used if you want to filter the saved blocks. For example,
if you are using a template then it will appear in the `ignoredContent`, and you can then ignore the `onSaveBlocks` call if it matches the `blocks`.

#### onLoad

- _parse_ `[string]` - Gutenberg `parse` function that parses HTML as a string and returns blocks

Load the initial content into the editor. This is a callback that runs after the editor has been created, and is supplied with a `parse` function that is specific to this editor instance. This should
be used so that the appropriate blocks are available.

#### __experimentalUndoManager

An alternative history undo/redo manager to be used by the editor. The passed in object must contain an `undo` and a `redo` methods, as well as a `undoStack` and a `redoStack` array properties containing the corresponding history. If not provided, the default history management will be used. This property is experimental and can change or be removed at any time.

#### __experimentalOnInput

An optional callback that will be passed down to the Gutenberg editor if provided.This property is experimental and can change or be removed at any time.

#### __experimentalOnChange

An optional callback that will be passed down to the Gutenberg editor if provided.This property is experimental and can change or be removed at any time.

#### __experimentalValue

An optional value (blocks) for the editor to show. If provided, it will be used as the internal value/blocks to display.This property is experimental and can change or be removed at any time.

#### __experimentalOnSelection

An optional callback that will be called when the selection changes in the editor. The only parameter passed to the callback will be the new selection value.

#### onError

Callback if an error occurs.

#### className

Additional class name attached to the editor.

#### renderMoreMenu

- _menuSettings_ `[object]` - settings for this particular editor
- _onClose_ `[func]` - Callback to close the more menu

Render additional components in the more menu.

Note: this needs improving or replacing with something more flexible

#### children

Add any components to customise the editor. These components will have access to the editor's Redux store.

#### Media uploader

If you want to make use of a media uploader and media library then you must set this up similar using the `editor.MediaUpload` filter. For example, if you want to use the Gutenberg media library then this would be:

```js
import { MediaUpload } from '@wordpress/media-utils';

addFilter( 'editor.MediaUpload', 'your-namespace/media-upload', () => MediaUpload );
```

You will also need to pass in the media uploader as part of the editor settings:

```js
import { mediaUpload } from '@wordpress/editor';

const settings = { your settings };

settings.editor.mediaUpload = mediaUpload;
```

In versions earlier than 2.21.0 this was automatically done, but this meant that you were unable to modify or disable it.

### Custom settings sidebar

By default the editor will use the Gutenberg settings sidebar. This provides the block and document inspector tabs, along with associated content.

If you wish to customise this sidebar then you can use the `iso.sidebar.customComponent` setting and pass a function that returns a React component.

You will need to manage the display of the sidebar yourself, including whether it should appear or not. It may help to look at the [existing sidebar code](src/components/block-editor/sidebar.js) for reference.

For example:

```js
sidebar: {
	customComponent: () => <div>My custom sidebar</div>
},
```

### Extending

Custom behaviour can be added through child components. These components will have access to the `isolated/editor` store, as well as to the editor instance versions of `core/block-editor`.

### Gutenberg requirements

Gutenberg uses iframes to display various parts of the editor, and it uses the global `window.__editorAssets` to store styles and scripts that will be added to this iframe. You may need to also
use this.

The default is:

`window.__editorAssets = { styles: '', scripts: '' }`

The values should be full `<link>` and `<script>` tags.

## Releasing

To make a release, ensure you are on the trunk branch. Do not update the version number in `package.json` - the release process will do this for you. Then run:

`GITHUB_TOKEN=<TOKEN> yarn dist`

## Common Problems

If Storybook complains about different ES6 problems then it can sometimes be solved with `npx yarn-deduplicate --scopes @babel`
