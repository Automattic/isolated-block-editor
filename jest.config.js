/**
 * WordPress dependencies
 */
const baseConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...baseConfig,
	setupFilesAfterEnv: [ ...( baseConfig.setupFilesAfterEnv || [] ), '<rootDir>/.jest/jest-setup.js' ],
	transformIgnorePatterns: [ '\\.pnp\\.[^\\/]+$' ],
	testPathIgnorePatterns: [ '/node_modules/', 'e2e/' ],
};
