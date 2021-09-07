# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Show outline around blocks that are currently being modified by peers when collaborative editing.

### Fixed

- Fix handling of initial content from `onLoad` when collaborative editing is enabled
- Improved reliability of collaborative editing when multiple peers are typing simultaneously
- Fix blur event when clicking in some UI components in the block inspector

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
