module.exports = ( api ) => {
	api.cache( true );

	if ( process.env.BUILD_ENV === 'cjs' ) {
		return {
			presets: [ '@wordpress/babel-preset-default', [ '@babel/preset-env', { modules: 'commonjs' } ] ],
			plugins: [ [ '@babel/plugin-transform-runtime', { useESModules: false } ] ],
		};
	}

	return {
		presets: [ '@wordpress/babel-preset-default' ],
	};
};
