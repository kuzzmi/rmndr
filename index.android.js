import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import { App } from './src/app';

export default class rmndrz extends Component {
    render() {
        return (
            <View style={styles.container}>
                <App />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('rmndrz', () => rmndrz);
