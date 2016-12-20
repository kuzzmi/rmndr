import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import {
    Header,
} from './src/modules/header';

export default class rmndrz extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Header />
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
