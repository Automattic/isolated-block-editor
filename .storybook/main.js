const path = require( 'path' );

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: [ '../src/**/*.stories.*', '../stories/**/*.stories.*' ],
	addons: [ '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss' ],
	webpackFinal: ( config ) => {
		// Workaround until Storybook supports Emotion 11
		const toPath = ( _path ) => path.join( process.cwd(), _path );
		config.resolve.alias = {
			...config.resolve.alias,
			'@emotion/styled': toPath( 'node_modules/@emotion/styled' ),
		};

		return config;
	},
};
