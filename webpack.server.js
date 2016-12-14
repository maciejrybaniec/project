/**
 * Webpack configuration for the server.
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

const productionConfig = {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

/**
 * Create list of external webpack modules.
 * @method createExternals
 * @returns {object} List of external modules.
 */
const createExternals = () => {
    const nodeModules = {};
    fs.readdirSync('node_modules')
        .filter((x) => ['.bin'].indexOf(x) === -1)
        .forEach((mod) => {
            nodeModules[mod] = 'commonjs ' + mod;
        });

    return nodeModules;
};

/**
 * Create back-end webpack configuration.
 * @method createConfig
 * @returns {object} Webpack configuration.
 */
function createConfig() {
    const config = {
        entry: {
            app: [path.join(__dirname, 'app.js')],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
        },
        target: 'node',
        cache: true,
        devtool: 'eval',
        resolve: {
            modulesDirectories: [
                'src', 'node_modules', 'static'
            ],
            extensions: ['', '.js', '.jsx', '.json'],
            root: path.join(__dirname, 'src'),
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }, {
                test: /\.json$/,
                loaders: ['json']
            }],
            noParse: /\.min\.js/
        },
        externals: createExternals(),
        node: {
            __dirname: true,
            fs: 'empty'
        }
    };

    if (isProduction) return webpackMerge(config, productionConfig);
    return config;
}

module.exports = createConfig;
