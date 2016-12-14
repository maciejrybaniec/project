/**
 * Webpack configuration for the application.
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

const commonConfig = {
    cache: true,
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, 'src'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
        }),
    ]
};

module.exports = function createConfig() {
    const config = {};

    return webpackMerge(commonConfig, config);
}
