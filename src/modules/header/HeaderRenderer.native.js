import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    component: {
    },
    headerText: {
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 16,
        fontWeight: '700',
        color: '#cf98d3',
        padding: 10,
    },
    divider: {
        height: 5,
        backgroundColor: '#AE81C5',
    },
});

export default () =>
    <View style={ styles.component }>
        <Text style={ styles.text }>
            R M N D R Z
        </Text>
        <View style={ styles.divider } />
    </View>;
