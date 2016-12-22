import React from 'react';

import {
    View,
} from 'react-native';

import { Header } from '../modules/header';
import { RemindersInput } from '../modules/remindersInput';
import { RemindersList } from '../modules/remindersList';

export default function(props, { reminders, editing }) {
    return (
        <View>
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
