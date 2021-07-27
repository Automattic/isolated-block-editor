module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: [ '../(src|stories)/**/*.stories.mdx', '../(src|stories)/**/*.stories.@(js|jsx|ts|tsx)' ],
	addons: [ '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss' ],
	webpackFinal: ( config ) => {
		config.module.rules.push( {
			// Transpiles optional chaining in directly imported AsBlocks file
			test: /node_modules\/asblocks\/src\//,
			loader: 'babel-loader',
		} );
		return config;
	},
};
