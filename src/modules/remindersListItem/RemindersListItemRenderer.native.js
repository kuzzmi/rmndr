import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { Datetime } from '../../app';

export default function(props) {
    const { reminder } = props;

    const timeString = Datetime.getCalendar(reminder.time);

    return (
        <View style={ styles.component }>
            <TouchableOpacity
                onPress={ this.handleReminderEdit }
                >
                <Text>i</Text>
            </TouchableOpacity>
            <View>
                <Text style={ styles.title }>
                    { reminder.title }
                </Text>
                <Text style={ styles.time }>
                    { timeString }
                </Text>
            </View>
            <TouchableOpacity
                onPress={ this.handleReminderRemove }
                >
                <Text>x</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        flex: 1,
    },
    time: {
        fontSize: 16,
    },
});
