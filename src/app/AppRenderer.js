import React, { Component } from 'react';

import {
    RemindersList,
    ReminderInput,
} from '../modules/reminder';

import {
    Header,
} from '../modules/header';

export default class extends Component {
    render() {
        const { reminders, editing } = this.state;

        return (
            <div className="appComponent">
                <Header />
                <div className="body">
                    <div className="input">
                        <ReminderInput
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
}
