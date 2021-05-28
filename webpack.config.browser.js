const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );

const config = {
	entry: './src/browser/index.js',
	output: {
		filename: 'iso-block-editor.min.js',
		path: path.resolve( __dirname, 'build-browser' ),
	},
	module: {
		rules: [
			{
				test: /\.(js|mjs)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss|\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		alias: {
			path: require.resolve( 'path' ),
		},
		modules: [ path.resolve( __dirname, 'node_modules' ) ],
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': { NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' ) },
		} ),
		new MiniCssExtractPlugin( {
			filename: 'iso-block-editor.min.css',
		} ),
		new webpack.ProvidePlugin( {
			process: 'process/browser',
		} ),
	],
	optimization: {
		minimizer: [ new TerserJSPlugin() ],
	},
};

if ( process.env.NODE_ENV === 'development' ) {
	config.devtool = 'inline-source-map';
	config.devServer = {
		historyApiFallback: {
			index: '/',
		},
		headers: { 'Access-Control-Allow-Origin': '*' },
		stats: {
			colors: true,
			hash: false,
			version: true,
			timings: true,
			assets: true,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: false,
			publicPath: false,
		},
		disableHostCheck: true,
	};
}

module.exports = config;
