import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default (props, state) =>
    <View style={ styles.component }>
        <Text style={ styles.text }>
            RemindersInput Component
        </Text>
    </View>;

const styles = StyleSheet.create({
    component: {
    },
    text: {
        fontSize: 16,
    },
});
