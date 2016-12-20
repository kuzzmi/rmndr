import Platform from './platform.js';
// import later from 'later';

// Listeners will follow this pattern:
// {
//    [alarm.type]: [ fn1, fn2 ]
// }
const listeners = {};

const create = options => {
    if (!options) {
        throw new Error('Alerts.create() expects options object as its only parameter');
    }

    const { type, name, when, callback } = options;

    if (!type || typeof type !== 'string' ||
        !name || typeof name !== 'string' ||
        !( when || when === 0 ) || typeof when !== 'number' ||
        !callback || typeof callback !== 'function') {
        throw new Error('Alerts.create() expects a valid options object, but was called with invalid');
    }

    if (Platform.is('chrome/extension')) {
        global.window.chrome.alarms.create(`${type}.${name}`, {
            when,
            // delayInMinutes: after,
            // periodInMinutes: every,
        });
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

const getListeners = () => listeners;

const addListener = (type, fn) => {
    listeners[type] = (listeners[type] || []).filter(_fn => _fn !== fn).concat(fn);
    return listeners[type];
};

const removeListener = (type, fn) => {

};

const Alarms = {
    create,
    reset,
    getListeners,
    addListener,
    removeListener,
};

export default Alarms;
