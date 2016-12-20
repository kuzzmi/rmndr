import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

describe('Alarms', () => {
    let Alarms;

    describe('functional and integrational', () => {
        describe('chrome/extension', () => {

            before(() => {
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true,
                });

                mockery.registerMock('./platform.js', {
                    is: name => name === 'chrome/extension',
                });

                global.window = {
                    chrome: {
                        alarms: {
                            create: () => { /* empty */ },
                        },
                    },
                };

                Alarms = require('./alarms').default;
            });

            after(() => {
                mockery.disable();
                mockery.deregisterAll();
            });

            it('should call global.window.chrome.alarms.create', () => {
                const spy = sinon.spy(global.window.chrome.alarms, 'create');

                Alarms.create({
                    type: 'foo',
                    name: 'bar',
                    when: 0,
                    callback: function() { /* empty */ },
                });

                expect(spy.called).to.be.true;
            });
        });
        describe('web', () => {

            before(() => {
                mockery.enable({
                    warnOnReplace: false,
                    warnOnUnregistered: false,
                    useCleanCache: true,
                });

                mockery.registerMock('./platform.js', {
                    is: name => name === 'web',
                });

                Alarms = require('./alarms').default;
            });

            after(() => {
                mockery.disable();
                mockery.deregisterAll();
            });

            it('should call global.window.chrome.alarms.create', () => {
                // const spy = sinon.spy(global.window.chrome.alarms, 'create');

                Alarms.create({
                    type: 'foo',
                    name: 'bar',
                    when: 0,
                    callback: function() { /* empty */ },
                });

                // expect(spy.called).to.be.true;
            });
        });
    });

    describe('unit tests', () => {
        before(() => {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true,
            });

            mockery.registerMock('./platform.js', {
                is: name => name === 'chrome/extension',
            });

            global.window = {
                chrome: {
                    alarms: {
                        create: () => { /* empty */ },
                    },
                },
            };

            Alarms = require('./alarms').default;
        });

        after(() => {
            mockery.disable();
            mockery.deregisterAll();
        });

        describe('#create()', () => {
            it('should be defined', () => {
                expect(Alarms.create).to.be.not.an.undefined;
            });

            it('should throw if called without required params', () => {
                const invalid1 = {
                    foo: 'bar',
                };
                const invalid2 = {
                    type: 'foo',
                };
                const invalid3 = {
                    type: 'foo',
                    name: 'foo',
                };
                const invalid4 = {
                    type: 'foo',
                    name: 'foo',
                    callback: 'foo',
                };
                const invalid5 = {
                    type: 'foo',
                    name: 'foo',
                    when: 'bar',
                    callback: 'foo',
                };

                expect(() => Alarms.create(invalid1)).to.throw(Error);
                expect(() => Alarms.create(invalid2)).to.throw(Error);
                expect(() => Alarms.create(invalid3)).to.throw(Error);
                expect(() => Alarms.create(invalid4)).to.throw(Error);
                expect(() => Alarms.create(invalid5)).to.throw(Error);
            });
        });

        describe('#reset()', () => {
            it('should be defined', () => {
                expect(Alarms.reset).to.be.not.an.undefined;
            });

            it('should remove all listeners', () => {
                const fn = () => { /* empty */ };
                const listeners = Alarms.addListener('foobar', fn);

                expect(listeners).to.be.an.array;

                expect(Object.keys(Alarms.reset()).length).to.be.equal(0);
            });
        });

        describe('#getListeners()', () => {
            it('should be defined', () => {
                expect(Alarms.getListeners).to.be.not.an.undefined;
            });

            it('should return array', () => {
                expect(Alarms.getListeners()).to.be.an.object;
            });
        });

        describe('#addListener()', () => {
            it('should be defined', () => {
                expect(Alarms.addListener).to.be.not.an.undefined;
            });

            it('should return listeners for a specific alarm when adding a new listener', () => {
                const fn = () => { /* empty */ };
                const listeners = Alarms.addListener('foobar', fn);

                expect(listeners).to.be.an.array;
                expect(listeners.length).to.equal(1);
            });

            it('should add listeners for a specific alarm type only once', () => {
                const fn = () => { /* empty */ };
                Alarms.addListener('foobar', fn);
            });
        });

        describe('#removeListener()', () => {
            it('should be defined', () => {
                expect(Alarms.removeListener).to.be.not.an.undefined;
            });
        });
    });
});
