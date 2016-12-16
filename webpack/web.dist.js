const path = require('path');

const defaults = require('./default.js');
const common = require('./common.dist.js');

const entry = {
    index: path.join(__dirname, '../src/index.web.js'),
};

module.exports = Object.assign(defaults, common, {
    entry,
    output: {
        path: path.join(__dirname, '../dist/web/'),
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
});
