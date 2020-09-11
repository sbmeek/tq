const {
    useBabelRc,
    override,
    adjustStyleLoaders,
    addPostcssPlugins
} = require('customize-cra')

module.exports = override(
    addPostcssPlugins([
        require('autoprefixer')({}),
        require('postcss-nested')({}), 
        require('postcss-global-nested')({}) 
    ]),
    useBabelRc(),
    adjustStyleLoaders((loader) => {
        const { use: [, css] } = loader;

        /* eslint eqeqeq: "off" */
        loader.exclude = /emoji-mart$/;
        css.options = {
            modules: {
                localIdentName: (process.env.NODE_ENV === 'development'
                    ? '[name]__[local]__[hash:base64:5]'
                    : '[hash:base64:6]'
                ),
            },
        }
    }),
)