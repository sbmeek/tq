const { useBabelRc, override, useEslintRc, adjustStyleLoaders, addWebpackModuleRule, addWebpackPlugin } = require('customize-cra')
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = override(
    useBabelRc(),
    useEslintRc(),
    addWebpackPlugin(() => {

        const env = dotenv.config().parsed;

        const envKeys = Object.keys(env).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next]);
            return prev;
        }, {});

        return {
            plugins: [
                new webpack.DefinePlugin(envKeys)
            ]
        };
    }),
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
        if (loader.test.toString() == /emoji-mart.css$/) {
            delete loader.exclude
            css.options = {
                modules: {
                    localIdentName: '[local]',
                },
            }
        }
    })
)