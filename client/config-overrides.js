const {
	useBabelRc,
	override,
	adjustStyleLoaders,
	addPostcssPlugins,
	addWebpackModuleRule
} = require('customize-cra');

module.exports = override(
	addWebpackModuleRule({
		test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
		loader: require.resolve('url-loader'),
		options: {
			limit: 10000,
			name: 'static/media/[hash:8].[ext]'
		}
	}),
	addPostcssPlugins([
		require('autoprefixer')({}),
		require('postcss-nested')({}),
		require('postcss-global-nested')({})
	]),
	useBabelRc(),
	adjustStyleLoaders((loader) => {
		const {
			use: [, css]
		} = loader;

		/* eslint eqeqeq: "off" */
		loader.exclude = /emoji-mart$/;
		css.options = {
			modules: {
				localIdentName:
					process.env.NODE_ENV === 'development'
						? '[name]__[local]__[hash:base64:5]'
						: '[hash:base64:6]'
			}
		};
	})
);
