/** @typedef {import('../../index').EditorSettings} EditorSettings */
/** @typedef {import('../../index').IsoSettings} IsoSettings */

/**
 * Get all the allowed block types, either from the settings, or all available blocks
 *
 * @param {{allowBlocks: string[]}} blockSettings - settings for available blocks
 * @param {object[]} allBlockTypes - All available blocks
 * @return {string[]}
 */
function getAllowedBlockTypes( blockSettings, allBlockTypes ) {
	if ( blockSettings && blockSettings.allowBlocks && blockSettings.allowBlocks.length > 0 ) {
		return blockSettings.allowBlocks;
	}

	// No allow blocks - return all blocks
	return allBlockTypes.map( ( block ) => block.name );
}

/**
 * Get all the disallowed block types, either from the settings, or all available blocks
 *
 * @param {{disallowBlocks: string[]}} blockSettings - settings for disallowed blocks
 * @return {string[]}
 */
function getDisallowedBlocks( blockSettings ) {
	if ( blockSettings && blockSettings.disallowBlocks ) {
		return blockSettings.disallowBlocks;
	}

	// No blocks disallowed
	return [];
}

/**
 * Get editor settings
 *
 * @param {EditorSettings} editorSettings - Editor settings
 * @param {IsoSettings} isoSettings
 * @param {object[]} allBlockTypes - All available blocks
 * @param {boolean} hasFixedToolbar - Do we need a fixed toolbar?
 * @return {EditorSettings}
 */
export default function getEditorSettings( editorSettings, isoSettings, allBlockTypes, hasFixedToolbar ) {
	// @ts-ignore
	const disallowBlocks = getDisallowedBlocks( isoSettings.blocks );

	return {
		...editorSettings,
		hasFixedToolbar,
		// @ts-ignore
		allowedBlockTypes: getAllowedBlockTypes( isoSettings.blocks, allBlockTypes ).filter(
			( blockName ) => disallowBlocks.indexOf( blockName ) === -1
		),

		// Enable or disable media uploads. We do this here as a logged out user doesn't have a user object, and so the standard Gutenberg `canUser` won't work
		mediaUpload: editorSettings.allowedMimeTypes.length === 0 ? null : editorSettings.mediaUpload,
	};
}
