const path = require('path');

const distPath = path.join(__dirname, '../dist');
const srcPath  = path.join(__dirname, '../src');

module.exports = {
    output: {
        path: distPath,
        filename: 'index.js'
    },
    resolve: {
        root: srcPath,
        alias: {
            app: 'app',
            modules: 'modules'
        }
    }
};
