const set = (object, callback) => {
    if (__DEV__) {
        const key = Object.keys(object).pop();
        const value = object[key];
        window.localStorage.setItem(key, JSON.stringify(value));
        callback && callback();
    } else {
        chrome.storage.set(object, callback);
    }
};

const get = (key, callback) => {
    if (__DEV__) {
        const value = window.localStorage.getItem(key);
        callback && callback({ [ key ]: JSON.parse( value ) });
    } else {
        chrome.storage.get(key, callback);
    }
};

const Storage = {
    set,
    get
};

export default Storage;
