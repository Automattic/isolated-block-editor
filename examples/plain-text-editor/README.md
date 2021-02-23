# Plain Text Editor

This uses the `IsolatedBlockEditor` to provide a Gutenberg replacement for a `textarea`. Content is loaded from the `textarea` on initialisation, and saved to the `textarea` during editing.

If the `textarea` is part of a `form` then it could be submitted back to the server.

Multiple editor instances can be created.

Gutenberg is bundled into a single file, and basic styling is provided. A text HTML page will be produced.

<img src="plain-text-editor.png" width="600">

## Building

Build the editor with:

`yarn build`

A sample `index.html` file is provided which connects this up to a form.

Files are output to the `build` directory.
