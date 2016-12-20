const camelcase = require('camelcase');

module.exports = {

    description() {
        return 'Creates a module folder and file structure';
    },

    fileMapTokens: () => ({
        __camelCaseName__: options => camelcase(options.entity.name),
    }),

};
