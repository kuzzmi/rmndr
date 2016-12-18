/* globals __NAME__ */
/* globals __VERSION__ */

import React, { Component } from 'react';

import {
    Storage,
    Alarms,
    Utils,
} from 'app';

import './App.scss';

import {
    RemindersList,
    ReminderInput,
} from 'modules/reminder';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminders: [],
            editing: null,
        };

        Utils.bind(this, 'handleReminderSave');
        Utils.bind(this, 'handleReminderRemove');
        Utils.bind(this, 'handleReminderEdit');
    }

    componentDidMount() {
        Storage.get('reminders', ({ reminders }) => {
            this.setState({
                reminders: reminders || [],
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { reminders } = this.state;
        if (prevState.reminders !== reminders) {
            Storage.set({
                reminders: reminders.map(r => ({
                    id: r.id,
                    title: r.title,
                    time: r.time.toString(),
                    rawTitle: r.rawTitle,
                    created: r.created,
                })),
            }, () => {
                reminders.forEach(reminder => {
                    const when = new Date(reminder.time).getTime();

                    if (when > Date.now()) {
                        Alarms.create(reminder.id, {
                            when,
                            callback: () => {
                                new Notification('Hey!', {
                                    body: reminder.title,
                                });
                            },
                        });
                    }
                });
            });
        }
    }

    handleReminderSave({ rawTitle, title, time, id, created }) {
        const { reminders } = this.state;
        const isNew = !id;
        const reminder = {
            id: id || Utils.nextId(),
            title,
            rawTitle,
            time,
            created: created || Date.now(),
        };

        if (isNew) {
            this.setState({
                reminders: [
                    ...this.state.reminders,
                    reminder,
                ],
            });
        } else {
            this.setState({
                reminders: reminders.map(r => r.id === id ? reminder : r),
                editing: null,
            });
        }
    }

    handleReminderRemove(reminder) {
        const reminders = this.state.reminders.filter(r => r.id !== reminder.id);

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
                    <span className="name">
                        { __NAME__ }
                    </span>
                    <span className="version">
                        v{ __VERSION__ }
                    </span>
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
