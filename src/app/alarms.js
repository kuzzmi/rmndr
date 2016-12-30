import Platform from './platform.js';
// import later from 'later';

// Listeners will follow this pattern:
// {
//    [alarm.type]: [ fn1, fn2 ]
// }
const listeners = {};

const create = options => {
    if (!options) {
        throw new Error('Alarms.create() expects options object as its only parameter');
    }

    const { type, name, when, callback } = options;

    if (!type || typeof type !== 'string' ||
        !name || typeof name !== 'string' ||
        !( when || when === 0 ) || typeof when !== 'number' ||
        !callback || typeof callback !== 'function') {
        throw new Error('Alarms.create() expects a valid options object, but was called with invalid');
    }

    if (Platform.is('chrome/extension')) {
        global.window.chrome.alarms.create(`${type}.${name}`, { when });
    } else if (Platform.is('electron') || Platform.is('web')) {
        const now = Date.now();
        setTimeout(callback, when - now + 1000);
    }
};

const reset = () => {
    // mutation of a listeners storage

    for (let type in listeners) {
        delete listeners[type];
    }

    return listeners;
};

const init = () => {
    if (Platform.is('chrome/extension')) {
        global.window.chrome.alarms.onAlarm.addListener(alarm => {
            const parsed = alarm.name.split('.');
            const type = parsed[0];
            const name = parsed[1];

            const fns = listeners[type];

            fns.forEach(fn => fn({ type, name, alarm }));
        });
    }
};

const getListeners = () => listeners;

const addListener = (type, fn) => {
    listeners[type] = (listeners[type] || []).filter(_fn => _fn !== fn).concat(fn);
    return listeners[type];
};

const removeListener = (type, fn) => {

};

const Alarms = {
    init,
    create,
    reset,
    getListeners,
    addListener,
    removeListener,
};

export default Alarms;
