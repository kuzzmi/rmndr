const webpack = require('webpack');
const path = require('path');

const defaults = require('./default.js');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

const { name, version, description } = require('../package.json');
const manifest = require('../src/manifest.json');

const html  = path.join(__dirname, '../src/index.html');
const entry = path.join(__dirname, '../src/index.js');

const plugins = [
    new CopyWebpackPlugin([{
        from: html,
        to: 'index.html'
    }]),
    new GenerateJsonPlugin('manifest.json', manifest, (key, value) => {
        switch (value) {
            case '__NAME__': return name;
            case '__DESCRIPTION__': return description;
            case '__VERSION__': return version;
            default:
                return value;
        }
    }, 4),
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings: true
        }
    })
];

module.exports = Object.assign(defaults, {
    entry,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [
                'babel'
            ]
        }]
    },
    plugins
});
