const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = {
	entry: './src/index.js',
	output: {
		filename: 'editor.build.js',
		path: path.resolve( __dirname, 'build' ),
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
			'isolated-block-editor': path.resolve( __dirname, '..', '..' ),
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
			filename: 'editor.css',
		} ),
		new HtmlWebpackPlugin( {
			title: 'Plain Text Editor',
			template: './src/index.html',
		} ),
		new webpack.ProvidePlugin( {
			process: 'process/browser',
		} ),
	],
	optimization: {
		minimizer: [ new TerserJSPlugin(), new OptimizeCSSAssetsPlugin( {} ) ],
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
