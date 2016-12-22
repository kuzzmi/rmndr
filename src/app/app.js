import { Component } from 'react';

import {
    Storage,
    Alarms,
    Utils,
    Notifications,
} from './index.js';

import Renderer from './AppRenderer';

// Side effects
const syncReminders = reminders => {
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
            const callback = () => Notifications.create({ message: reminder.title });

            if (when > Date.now()) {
                Alarms.create({
                    type: 'reminder',
                    name: reminder.id,
                    when,
                    callback,
                });
            }
        });
    });
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminders: [],
            editing: null,
        };

        [
            'handleReminderSave',
            'handleReminderRemove',
            'handleReminderEdit',
        ].forEach(Utils.bind(this));
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
            syncReminders(reminders);
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
        return Renderer.call(this, this.props, this.state);
    }
}

export default App;
