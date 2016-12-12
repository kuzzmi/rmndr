const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

const { name, version, description } = require('./package.json');
const manifest = require('./src/manifest.json');

const distPath = path.join(__dirname, 'dist');
const html     = path.join(__dirname, 'src/index.html');
const entry    = path.join(__dirname, 'src/index.js');

module.exports = {
    entry,
    output: {
        path: distPath,
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    plugins: [
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
        }, 4)
    ]
}
