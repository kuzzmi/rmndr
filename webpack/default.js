const path = require('path');

const distPath = path.join(__dirname, '../dist');
const srcPath  = path.join(__dirname, '../src');

const { name, version } = require('../package.json');

const defines = {
    __NAME__: JSON.stringify( name ),
    __VERSION__: JSON.stringify( version )
};

module.exports = {
    output: {
        path: distPath,
        filename: '[name].js'
    },
    resolve: {
        root: srcPath,
        alias: {
            app: 'app',
            modules: 'modules'
        }
    },
    defines
};
