const expect = require('chai').expect;

describe('platform', () => {
    let Platform;

    afterEach(() => {
        delete global.window;
    });

    describe('#is()', () => {
        it('should be defined', () => {

            global.window = {};

            Platform = require('./platform.js').default;
            expect(Platform.is).be.not.an.undefined;
        });

        it('should return correct platform', () => {

            global.window = {
                chrome: {
                    extension: true,
                },
            };

            Platform = require('./platform.js').default;

            expect(Platform.is('chrome/extension')).to.be.true;
        });
    });
});
