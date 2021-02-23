module.exports = function ( api ) {
	api.cache( true );

	return {
		presets: [ '@wordpress/default' ],
		plugins: [ 'babel-plugin-emotion', 'babel-plugin-inline-json-import' ],
	};
};
