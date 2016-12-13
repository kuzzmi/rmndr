import React, { Component } from 'react';

import Storage from './storage.js';

const bind = ( context, fnName ) => context[fnName] = context[fnName].bind(context);
const nextId = () => `${ Date.now() }`;

class RemindersList extends Component {
    render() {
        const { reminders } = this.props;

        return (
            <ul>
            {
                reminders && reminders.map(
                    reminder =>
                    <li key={ reminder.id }>
                        <span>
                            { reminder.title }
                        </span>
                        <span>
                            { reminder.time }
                        </span>
                    </li>
                )
            }
            </ul>
        );
    }
}

class ReminderInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: nextId(),
            title: '',
            time: ''
        };

        bind(this, 'handleTitleChange');
        bind(this, 'handleTimeChange');
        bind(this, 'handleKeyPress');
        bind(this, 'handleSave');
        bind(this, 'resetState');
    }

    resetState() {
        this.setState({
            id: nextId(),
            title: '',
            time: ''
        });
    }

    handleSave() {
        const { id, title, time } = this.state;
        if (title) {
            this.props.onAdd({
                id,
                title,
                time
            });
            this.resetState();
        }
    }

    handleTitleChange(e) {
        const { target: { value } } = e;

        this.setState({
            title: value
        });
    }

    handleTimeChange(e) {
        const { target: { value } } = e;

        this.setState({
            time: value
        });
    }

    handleKeyPress({ key }) {
        if (key === 'Enter') {
            this.handleSave();
        }
    }

    render() {
        const { title, time } = this.state;

        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={ title }
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTitleChange }
                        />
                </div>
                <div>
                    <input
                        type="time"
                        value={ time }
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTimeChange }
                        />
                </div>
                <div>
                    <button
                        onClick={ this.handleSave }
                        >
                        Add
                    </button>
                </div>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminders: []
        };

        bind(this, 'handleReminderAdd');
    }

    componentDidMount() {
        Storage.get('reminders', ({ reminders }) => {
            if (!reminders) {
                Storage.set({ reminders: [] });
            }

            this.setState({
                reminders
            });
        });
    }

    componentDidUpdate() {
        const { reminders } = this.state;
        Storage.set({ reminders });
    }

    handleReminderAdd(reminder) {
        this.setState({
            reminders: [
                ...this.state.reminders,
                reminder
            ]
        });
    }

    render() {
        const { reminders } = this.state;

        return (
            <div>
                <h3>Add reminder</h3>
                <ReminderInput
                    onAdd={ this.handleReminderAdd }
                    />
                <h3>All reminders</h3>
                <RemindersList
                    reminders={ reminders }
                    />
            </div>
        );
    }
}

export default App;
