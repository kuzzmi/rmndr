import { expect } from 'chai';

import * as Utils from './utils.js';

describe('Utils', () => {
    describe('#nextId()', () => {
        it('should be defined', () => {
            expect(Utils.nextId).to.be.not.an.undefined;
        });

        it('should return a string', () => {
            expect(Utils.nextId()).to.be.a.string;
        });

        it('should return unique values each time', () => {
            expect(Utils.nextId() === Utils.nextId()).to.not.be.equal;
        });
    });

    describe('#bind()', () => {
        it('should be defined', () => {
            expect(Utils.bind).to.be.not.an.undefined;
        });

        it('should bind the function to the given context', () => {
            const object = {
                test() {
                    expect(this).to.equal(object);
                }
            };

            Utils.bind(object, 'test');
            object.test();
        });
    });
});
