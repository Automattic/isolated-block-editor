const path = require( 'path' );
const webpack = require( 'webpack' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const postcssFocus = require( 'postcss-focus' );
const postcssReporter = require( 'postcss-reporter' );
const pkg = require( './package.json' );

const isProduction = () => process.env.NODE_ENV === 'production';

const config = {
	entry: [ path.join( __dirname, 'src', 'index.js' ) ],
	output: {
		path: path.join( __dirname, 'build' ),
		filename: 'isolated-block-editor.min.js',
		library: 'isolated-block-editor',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
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
		extensions: [ '.js', '.jsx', '.scss', '.css' ],
	},
	plugins: [
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
		new webpack.BannerPlugin( 'Isolated Block Editor v' + pkg.version ),
		new webpack.LoaderOptionsPlugin( {
			options: {
				postcss: [
					postcssFocus(),
					postcssPresetEnv( {
						browsers: [ 'last 2 versions', 'IE > 10' ],
					} ),
					postcssReporter( {
						clearMessages: true,
					} ),
				],
			},
		} ),
		new MiniCssExtractPlugin( {
			filename: 'isolated-block-editor.min.css',
			chunkFilename: '[id].css',
		} ),
	],
	performance: {
		hints: false,
	},
	mode: process.env.NODE_ENV || 'development',
	optimization: {
		minimizer: [ new TerserJSPlugin( { extractComments: false } ), new OptimizeCSSAssetsPlugin( {} ) ],
	},
};

if ( ! isProduction() ) {
	config.devtool = 'source-map';
}

module.exports = config;
