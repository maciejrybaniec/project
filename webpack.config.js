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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
        }),
    ]
};

module.exports = function createConfig() {
    const config = {
        entry: {
            client: [path.join(__dirname, 'client.js')],
        },
        output: {
            path: path.join(__dirname, 'dist', 'assets'),
            filename: 'main.js',
        },
        cache: true,
        devtool: 'source-map',
        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: path.join(__dirname, 'src'),
        },
        node: {
            __filename: true
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }]
        }
    };

    if (isProduction) return webpackMerge(config, productionConfig);
    return config;

    return webpackMerge(commonConfig, config);
}
