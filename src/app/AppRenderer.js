import React from 'react';

import { Header } from '../modules/header';
import { RemindersInput } from '../modules/remindersInput';
import { RemindersList } from '../modules/remindersList';

export default function(props, { reminders, editing }) {
    return (
        <div className="appComponent">
            <Header />
            <div className="body">
                <div className="input">
                    <RemindersInput
                        reminder={ editing }
                        saveReminder={ this.handleReminderSave }
                        />
                </div>
                <div className="list">
                    <RemindersList
                        reminders={ reminders }
                        editReminder={ this.handleReminderEdit }
                        removeReminder={ this.handleReminderRemove }
                        />
                </div>
            </div>
        </div>
    );
}
