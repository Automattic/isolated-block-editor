/**
 * WordPress dependencies
 */
const baseConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...baseConfig,
	setupFilesAfterEnv: [ ...( baseConfig.setupFilesAfterEnv || [] ), '<rootDir>/.jest/jest-setup.js' ],
};
