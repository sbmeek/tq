const { useBabelRc, override, useEslintRc, adjustStyleLoaders, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
    useBabelRc(),
    useEslintRc(),
    addWebpackModuleRule({
        test: /emoji-mart.css$/,
        use: [
            {
                loader: require.resolve('style-loader'),
                options: { 
                    attributes: { type: 'text/css' }
                }
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    modules: {
                        localIdentName: '[local]',
                    },
                    onlyLocals: true
                }
            },
        ],
    }),
    adjustStyleLoaders((loader) => {
        const { use: [, css] } = loader;

        /* eslint eqeqeq: "off" */
        loader.exclude = /node_modules/;
        css.options = {
            modules: {
                localIdentName: (process.env.NODE_ENV === 'development'
                    ? '[name]__[local]__[hash:base64:5]'
                    : '[hash:base64:6]'
                ),
            },
        }
        if(loader.test.toString() == /emoji-mart.css$/){
            delete loader.exclude
            css.options = {
                modules: {
                    localIdentName: '[local]',
                },
            }
        }
    })
)