# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.12.1] - Unreleased

### Fixed

- Fix caret position when undoing in collab mode.
- Revert @wordpress/interface to 4.4.0 to restore block inspector functionality.

## [2.12.0] - 2022-04-15

### Added

- `attachEditor` now takes an optional settings object

## [2.11.1] - 2022-02-25

### Fixed

- Fixed basic handling of nested lists in collab mode.
- Fix `documentInspector` option so it allows the document title to be changed

## [2.11.0] - 2022-02-18

### Added

- In collab mode, add support for same-block concurrent editing.

### Fixed

- Sanitize HTML in block attributes received from collab peers.

## [2.10.0] - 2022-02-09

### Added

- `is-preview-mode` class is added to the editor when preview is enabled

### Fixed

- Pattern fix in 2.9.1 stopped patterns being triggered normally.

## [2.9.1] - 2022-02-07

### Fixed

- In collab mode, prevent emojis from being separated by a peer caret when the emoji consists of more than one Unicode code point.
- In collab mode, prevent peer carets from disappearing when at the end of List block items.
- Only change current pattern if the pattern name changes. Helps to fix an infinite loop situation.

## [2.9.0] - 2021-12-09

### Breaking changes

- Renamed collab-related selectors and action creators for clarity:
  - `getPeers` to `getCollabPeers`
  - `hasPeers` to `hasCollabPeers`
  - `setAvailablePeers` to `setAvailableCollabPeers`
  - `setPeerSelection` to `setCollabPeerSelection`

### Added

- Smart undo/redo functionality in collab mode. Each peer will only be able to undo their own edits and not of others, with the current limitation being that they are editing separate blocks.

## [2.8.1] - 2021-12-06

### Fixed

- Fix CSS override to disable Gutenberg's mobile `position: static` - it needs to be important but still allow previews to work

## [2.8.0] - 2021-12-06

### Added

- Add support for changing device types (via `setDeviceType` and `getDeviceType`)
- Add support for resizable canvas
- Add editor styles to editor

### Fixed

- Set a default `__editorAssets` if not defined
- Fixed block previews not detecting height changes
- Fix invalid default editor styles

## [2.7.2] - 2021-12-02

### Fixed

- Fix crash with Gutenberg 12.1.0
- Updated all package versions to resolve a dependency problem

## [2.7.1] - 2021-11-26

### Fixed

- Restore previous `is-fullscreen-mode` behaviour
- Set a max width on interface skeleton to help stop wide content pushing outside of the editor
- Change how inserter is closed so it works better with pattern explorer

## [2.7.0] - 2021-11-23

### Breaking changes

- Uses Gutenberg interface skeleton, changing the overall layout of the editor

### Added

- Gutenberg sidebars, for the block inserter and inspector, are supported through the `sidebar` setting
- `footer` setting to enable the footer area
- `FooterSlot` component to insert content into footer area

## [2.6.0] - 2021-11-01

### Fixed

- Fix changing of caret avatar text color in collab mode
- Fix no list margin in Gutenberg term component

### Breaking changes

- Editor now saves initial content if there is anything to save

## [2.5.1] - 2021-10-13

### Added

- Browser build contains toolbar styles

### Fixed

- Browser build now contains `@wordpress/keyboard-shortcuts` module
- Prevent duplicate collaboration format registration
- Fix multi-line collaboration carets

## [2.5.0] - 2021-10-06

### Added

- `selectorTool` setting to show the selector tool

### Breaking changes

- Toolbar has changed to match core Gutenberg and will now be two lines in height (when using 'top toolbar' mode)

## [2.4.3] - 2021-09-30

### Fixed

- Use `ShortcutProvider` to prevent crash with Gutenberg 11.6.0

### [2.4.2] - 2021-09-27

### Changed

- Tweaks to collaborative editing UI.

## [2.4.1] - 2021-09-09

### Fixed

- Further fix to blur event in block inspector to catch clicks that fall in the popover itself

## [2.4.0] - 2021-09-08

### Breaking changes

- Change collaborative editing features to be enabled via a top-level named export [<CollaborativeEditing>](https://github.com/Automattic/isolated-block-editor/tree/trunk/src/components/collaborative-editing) to avoid unnecessary bundle bloat.

### Added

- Show outline around blocks that are currently being modified by peers when collaborative editing.
- Presence avatars for collaborative editing peers.
- Update peer caret position indicators more frequently while collaborative editing.

### Fixed

- Fix handling of initial content from `onLoad` when collaborative editing is enabled
- Improved reliability of collaborative editing when multiple peers are typing simultaneously
- Fix blur event when clicking in some UI components in the block inspector

### Changed

- Updated all @wordpress packages to latest

## [2.3.0] - 2021-07-29

### Added

- Support for real-time collaborative editing (experimental)

## [2.2.0]

Skipped due to mishandling of release.

## [2.1.0] - 2021-07-29

### Added

- `ToolbarSlot` added for toolbar customisation
- Add `getEditCount` selector to help detect changes

### Changed

- Updated all @wordpress packages to latest

## [2.0.0] - 2021-07-20

### Changed

- Package renamed to @automattic/isolated-block-editor
