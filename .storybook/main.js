const path = require( 'path' );

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: [ '../src/**/*.stories.*', '../stories/**/*.stories.*' ],
	addons: [ '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss' ],
};
