import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import chrono from 'chrono-node';

import './RemindersList.scss';

import { bind } from 'app/utils.js';

const getPercents = (since, until) => {
    const _until = chrono.parse(until)[0].start.date().getTime();
    const total = _until - since;        // ms between end and start
    const ellapsed = Date.now() - since; // ms between now and start
    return ellapsed / ~~( total / 100 );
};

class TimeProgress extends Component {
    constructor(props) {
        super(props);

        const ellapsedPercents = getPercents(props.since, props.until);

        this.state = {
            width: ellapsedPercents > 100 ? 100 : ellapsedPercents
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.tick(this.props);
        }, 1000);
    }

    tick({ since, until }) {
        const ellapsedPercents = getPercents(since, until);

        if (ellapsedPercents <= 100) {
            this.setState({
                width: ellapsedPercents
            });
        } else {
            this.setState({
                width: 100
            });
            clearInterval(this.interval);
        }
    }

    render() {
        const { width } = this.state;
        return <div className="progress" style={{ width: `${ width }%` }} />;
    }
}

class Reminder extends Component {

    constructor(props) {
        super(props);
        bind(this, 'handleReminderRemove');
        bind(this, 'handleReminderEdit');
    }

    handleReminderEdit() {
        const { reminder, editReminder } = this.props;
        editReminder(reminder);
    }

    handleReminderRemove() {
        const { reminder, removeReminder } = this.props;
        removeReminder(reminder);
    }

    render() {
        const { reminder } = this.props;

        return (
            <li key={ reminder.id }>
                <div className="reminder">
                    <div className="leftButton">
                        <button
                            onClick={ this.handleReminderEdit }>
                            <span className="lnr lnr-pencil"></span>
                        </button>
                    </div>
                    <div className="info">
                        <div className="title">
                            { reminder.title }
                        </div>
                        <div className="time">
                            { reminder.time }
                        </div>
                    </div>
                    <div className="rightButton">
                        <button
                            onClick={ this.handleReminderRemove }>
                            <span className="lnr lnr-trash"></span>
                        </button>
                    </div>
                </div>
                <TimeProgress since={ reminder.created } until={ reminder.time } />
            </li>
        );
    }
}

const RemindersList = ({ reminders, removeReminder, editReminder }) =>
    <div className="remindersListComponent">
        <FlipMove
            staggerDurationBy={ 10 }
            duration={ 250 }
            maintainContainerHeight={ true }
            typeName="ul">
            {
                reminders && reminders.map(reminder =>
                    <Reminder
                        key={ reminder.id }
                        removeReminder={ removeReminder }
                        editReminder={ editReminder }
                        reminder={ reminder }
                        />
                )
            }
        </FlipMove>
    </div>;

export default RemindersList;
