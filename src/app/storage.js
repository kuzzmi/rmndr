import Platform from './platform.js';

const STORAGE_KEY = '@RMNDRZ';

const set = async (object, callback) => {
    try {
        if (Platform.is('chrome/extension')) {
            window.chrome.storage.sync.set(object, callback);
        } else if (Platform.is('native')) {
            const key = Object.keys(object).pop();
            const value = object[key];
            const AsyncStorage = require('react-native').AsyncStorage;
            await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, value);
            callback && callback(object);
        } else if (window.localStorage) {
            const key = Object.keys(object).pop();
            const value = object[key];
            window.localStorage.setItem(key, JSON.stringify(value));
            callback && callback(object);
        }
    } catch (e) {
        console.error(e);
    }
};

const get = async (key, callback) => {
    try {
        if (Platform.is('chrome/extension')) {
            window.chrome.storage.sync.get(key, callback);
        } else if (Platform.is('native')) {
            const AsyncStorage = require('react-native').AsyncStorage;
            const value = await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, value);
            callback && callback({ [ key ]: value });
        } else if (window.localStorage) {
            const value = window.localStorage.getItem(key);
            callback && callback({ [ key ]: JSON.parse( value ) });
        }
    } catch (e) {
        console.error(e);
    }
};

const Storage = {
    set,
    get,
};

export default Storage;
