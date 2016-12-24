import { AsyncStorage } from 'react-native';

const STORAGE_KEY = '@RMNDRZ';

export default {
    set: async (object, callback) => {
        try {
            const key = Object.keys(object).pop();
            const value = object[key];
            await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, value);
            callback && callback(object);
        } catch (e) {
            console.error(e);
        }
    },
    get: async (key, callback) => {
        try {
            const value = await AsyncStorage.setItem(`${STORAGE_KEY}:${key}`, value);
            callback && callback({ [ key ]: value });
        } catch (e) {
            console.error(e);
        }
    },
};
