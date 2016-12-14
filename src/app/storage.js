import Platform from 'app/platform';

const set = (object, callback) => {
    if (Platform.is('chrome/extension')) {
        chrome.storage.sync.set(object, callback);
    } else {
        const key = Object.keys(object).pop();
        const value = object[key];
        window.localStorage.setItem(key, JSON.stringify(value));
        callback && callback();
    }
};

const get = (key, callback) => {
    if (Platform.is('chrome/extension')) {
        chrome.storage.sync.get(key, callback);
    } else {
        const value = window.localStorage.getItem(key);
        callback && callback({ [ key ]: JSON.parse( value ) });
    }
};

const Storage = {
    set,
    get
};

export default Storage;
