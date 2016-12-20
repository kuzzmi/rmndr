const path = require('path');

const CopyWebpackPlugin  = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const defaults = require('./default.js');
const common = require('./common.dist.js');

const { name, version, description } = require('../package.json');
const manifest = require('../src/manifest.json');

const images = {
    32: path.join(__dirname, '../src/assets/img/icon32.png'),
    48: path.join(__dirname, '../src/assets/img/icon48.png'),
    128: path.join(__dirname, '../src/assets/img/icon128.png'),
};

const entry = {
    index: path.join(__dirname, '../src/index.ext.js'),
    background: path.join(__dirname, '../src/background.js'),
};

const plugins = [
    ...common.plugins,
    new CopyWebpackPlugin([{
        from: images[32],
        to: 'icon32.png',
    }, {
        from: images[48],
        to: 'icon48.png',
    }, {
        from: images[128],
        to: 'icon128.png',
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
];

module.exports = Object.assign(defaults, {
    entry,
    output: {
        path: path.join(__dirname, '../dist/ext/'),
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
    plugins,
});
