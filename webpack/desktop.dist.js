const path = require('path');

const defaults = require('./default.js');
const common = require('./common.dist.js');

const CopyWebpackPlugin  = require('copy-webpack-plugin');
const html = path.join(__dirname, '../src/index.desktop.html');

const entry = {
    index: path.join(__dirname, '../src/index.desktop.js'),
};

module.exports = Object.assign(defaults, common, {
    entry,
    output: {
        path: path.join(__dirname, '../dist/desktop/'),
        filename: defaults.output.filename,
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [
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
        ...common.plugins,

        new CopyWebpackPlugin([{
            from: html,
            to: 'index.html',
        }]),
    ],
});

