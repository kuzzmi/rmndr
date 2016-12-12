const path = require('path');
const StringReplace = require('string-replace-webpack-plugin');

const { name, version, description } = require('./package.json');

const distPath = path.join(__dirname, 'dist');
const srcPath =  path.join(__dirname, 'src');
const entry = path.join(__dirname, 'src/index.js');
// const manifest = path.join(__dirname, 'src/manifest.json');

module.exports = {
    entry: {
        entry,
        // manifest
    },
    output: {
        path: distPath,
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel'
        }, {
            test: /.json$/,
            loader: 'json'
        }, {
            test: /manifest.json$/,
            loader: StringReplace.replace({
                replacements: [{
                    pattern: /__NAME__/,
                    replacement: () => name,
                }, {
                    pattern: /__DESCRIPTION__/,
                    replacement: () => description,
                }, {
                    pattern: /__VERSION__/,
                    replacement: () => version,
                }]
            })
        }]
    },
    plugins: [
        new StringReplace()
    ]
}
