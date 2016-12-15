const webpack = require('webpack');
const path = require('path');

const defaults = require('./default.js');
const { name, version } = require('../package.json');

const entry = {
    index: [
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/index.js')
    ]
};

module.exports = Object.assign(defaults, {
    entry,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel'
            ]
        }, {
            test: /\.scss$/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        }]
    },
    plugins: [
        new webpack.DefinePlugin(defaults.defines, {
            __DEV__: true
        })
    ]
});
