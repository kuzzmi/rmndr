import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    component: {
    },
    text: {
        fontSize: 16,
    },
});

export default () =>
    <View style={ styles.component }>
        <Text style={ styles.text }>
            rmndrz
        </Text>
        <Text style={ styles.text }>
            v1.0.0
        </Text>
    </View>;
