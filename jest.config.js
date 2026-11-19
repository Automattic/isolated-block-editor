/**
 * WordPress dependencies
 */
const baseConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...baseConfig,
	moduleNameMapper: {
		...baseConfig.moduleNameMapper,
		// Use one copy of React, as @wordpress/element ships its own
		'^react$': '<rootDir>/node_modules/react',
		'^react/(.*)$': '<rootDir>/node_modules/react/$1',
		'^react-dom$': '<rootDir>/node_modules/react-dom',
		'^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',
	},
	setupFilesAfterEnv: [ ...( baseConfig.setupFilesAfterEnv || [] ), '<rootDir>/.jest/jest-setup.js' ],
	transformIgnorePatterns: [ '\\.pnp\\.[^\\/]+$' ],
	testPathIgnorePatterns: [ '/node_modules/', 'e2e/' ],
};
