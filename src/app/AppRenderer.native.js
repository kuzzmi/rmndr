import React from 'react';

import {
    View,
    StyleSheet,
} from 'react-native';

import { Header } from '../modules/header';
import { RemindersInput } from '../modules/remindersInput';
import { RemindersList } from '../modules/remindersList';

export default function(props, { reminders, editing }) {
    return (
        <View style={ styles.component }>
            <Header />
            <RemindersInput
                reminder={ editing }
                saveReminder={ this.handleReminderSave }
                />
            <RemindersList
                reminders={ reminders }
                editReminder={ this.handleReminderEdit }
                removeReminder={ this.handleReminderRemove }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
        backgroundColor: '#FCFBFC',
    },
});
