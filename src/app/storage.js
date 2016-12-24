import Platform from './platform.js';

const set = (object, callback) => {
    if (Platform.is('chrome/extension')) {
        window.chrome.storage.sync.set(object, callback);
    } else if (window.localStorage) {
        const key = Object.keys(object).pop();
        const value = object[key];
        window.localStorage.setItem(key, JSON.stringify(value));
        callback && callback(object);
    }
};

const get = (key, callback) => {
    if (Platform.is('chrome/extension')) {
        window.chrome.storage.sync.get(key, callback);
    } else if (window.localStorage) {
        const value = window.localStorage.getItem(key);
        callback && callback({ [ key ]: JSON.parse( value ) });
    }
};

const Storage = {
    set,
    get,
};

export default Storage;
