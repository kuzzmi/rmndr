import { AsyncStorage } from 'react-native';

const STORAGE_KEY = '@RMNDRZ';

export default {
    set: async (object, callback) => {
        try {
            const key = Object.keys(object).pop();
            const value = object[key];
            await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, JSON.stringify(value));
            callback && callback(object);
        } catch (e) {
            console.error(e);
        }
    },
    get: async (key, callback) => {
        try {
            const value = await AsyncStorage.getItem(`${STORAGE_KEY}:${key}`);
            callback && callback({ [ key ]: JSON.parse(value) });
        } catch (e) {
            console.error(e);
        }
    },
};
