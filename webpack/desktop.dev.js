const webpack = require('webpack');
const path = require('path');

const defaults = require('./default.js');

const entry = {
    index: [
        path.join(__dirname, '../src/index.desktop.js'),
    ],
};

module.exports = Object.assign(defaults, {
    entry,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel',
            ],
        }, {
            test: /\.scss$/,
            loaders: [
                'style',
                'css',
                'sass',
            ],
        }],
    },
    plugins: [
        new webpack.DefinePlugin(defaults.defines, {
            __DEV__: true,
        }),
    ],
});

