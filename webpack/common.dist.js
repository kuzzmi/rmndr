const webpack = require('webpack');
const path = require('path');
const defaults = require('./default.js');

const CopyWebpackPlugin  = require('copy-webpack-plugin');
const html = path.join(__dirname, '../src/index.html');

const plugins = [
    new CopyWebpackPlugin([{
        from: html,
        to: 'index.html',
    }]),
    new webpack.DefinePlugin(defaults.defines, {
        __DEV__: false,
        'process.env':{
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings: true,
        },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
];

module.exports = {
    plugins,
};
