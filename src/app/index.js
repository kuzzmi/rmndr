import React, { Component } from 'react';

import chrono from 'chrono-node';
// import moment from 'moment';
import Storage from './storage.js';

import './App.scss';

import {
    RemindersList,
    ReminderInput
} from 'modules/reminder';

import { bind, nextId } from './utils.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminders: [],
            editing: null
        };

        bind(this, 'handleReminderSave');
        bind(this, 'handleReminderRemove');
        bind(this, 'handleReminderEdit');
    }

    componentDidMount() {
        Storage.get('reminders', ({ reminders }) => {
            if (!reminders) {
                Storage.set({ reminders: [] });
            }

            this.setState({ reminders });
        });
    }

    componentDidUpdate() {
        const { reminders } = this.state;
        Storage.set({ reminders });
    }

    handleReminderSave({ title, time, id }) {
        const { reminders, editing } = this.state;
        const isNew = !id;
        const reminder = {
            id: id || nextId(),
            title,
            time
        };

        if (isNew) {
            this.setState({
                reminders: [
                    ...this.state.reminders,
                    reminder
                ]
            });
        } else {
            this.setState({
                reminders: reminders.map(r => r.id === id ? reminder : r),
                editing: null
            });
        }

        const when = chrono.parse(time)[0].start.date().getTime();

        // refactor
        chrome.alarms.create(id, { when });
    }

    handleReminderRemove(reminder) {
        const reminders =
            this.state.reminders.filter(r => r.id !== reminder.id);

        this.setState({ reminders });
    }

    handleReminderEdit(editing) {
        this.setState({ editing });
    }

    render() {
        const { reminders, editing } = this.state;

        return (
            <div className="appComponent">
                <div className="header">
                    Yominder
                </div>
                <div className="separator"></div>
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

export default App;
