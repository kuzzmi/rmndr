const path = require('path');

const distPath = path.join(__dirname, '../dist');

module.exports = {
    output: {
        path: distPath,
        filename: 'index.js'
    }
};
