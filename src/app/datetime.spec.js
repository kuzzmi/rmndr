import { expect } from 'chai';

import * as Datetime from './datetime.js';

describe('Datetime', () => {
    describe('#getNow()', () => {
        it('should be defined', () => {
            expect(Datetime.getNow).to.not.be.an.undefined;
        });
    });

    describe('#getFromTime()', () => {
        it('should be defined', () => {
            expect(Datetime.getFromTime).to.not.be.an.undefined;
        });

        it('should get the next closest time to the reference date from text', () => {
            const ref = new Date(2016, 11, 15, 23, 59);
            const text = '9:00';
            const expected = new Date(2016, 11, 16, 9, 0).getTime();

            const result = Datetime.getFromTime(text, ref).getTime();

            expect(result).to.be.equal(expected);
        });
    });

    describe('#parse()', () => {
        it('should be defined', () => {
            expect(Datetime.parse).to.be.not.an.undefined;
        });

        it('should parse a text and return clean text and parsed result', () => {
            const text1 = 'test tomorrow at 9:00';
            const text2 = 'test on Friday 9:00';
            const text3 = 'test at 9:00 tomorrow';

            const result1 = Datetime.parse(text1);
            const result2 = Datetime.parse(text2);
            const result3 = Datetime.parse(text3);

            expect(result1).to.have.all.keys([ 'title', 'dates' ]);
            expect(result2).to.have.all.keys([ 'title', 'dates' ]);
            expect(result3).to.have.all.keys([ 'title', 'dates' ]);
            expect(result1.title).to.equal('test');
            expect(result2.title).to.equal('test');
            expect(result3.title).to.equal('test');
        });
    });
});
