const { useBabelRc, override, useEslintRc, adjustStyleLoaders } = require('customize-cra')

module.exports = override(
    useBabelRc(),
    useEslintRc(),
    adjustStyleLoaders((({ use: [, css] }) => {
        css.options = {
            modules: {
                localIdentName: (process.env.NODE_ENV === 'development'
                    ? '[name]__[local]__[hash:base64:5]'
                    : '[hash:base64:6]'
                )
            },
        }
    }))
)