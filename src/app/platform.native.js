import { Platform } from 'react-native';

export default {
    is: name => {
        if (name === 'native')
            return true;
        else if (Platform.OS === 'android')
            return name === 'android';
        else if (Platform.OS === 'ios')
            return name === 'ios';
    },
};
