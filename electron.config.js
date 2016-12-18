const ConfigStore = require('configstore');
const pkg = require('./package.json');

const defaults = {
    window: {
        minWidth: 400,
        minHeight: 540,
    },
};

const conf = new ConfigStore(pkg.name, defaults);

module.exports = conf;
