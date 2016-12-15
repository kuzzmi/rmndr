import React, { Component } from 'react';

import {
    Utils,
    Datetime
} from 'app';

import './ReminderListItem.scss';

const getPercents = (since, until) => {
    const total = new Date(until).getTime() - since; // ms between end and start
    const ellapsed = Date.now() - since;             // ms between now and start
    return ~~( ellapsed / ~~( total / 100 ) );       // percents of ellapsed time to total
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

    componentWillUnmount() {
        clearInterval(this.interval);
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

class ReminderListItem extends Component {

    constructor(props) {
        super(props);
        Utils.bind(this, 'handleReminderRemove');
        Utils.bind(this, 'handleReminderEdit');
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

        const timeString = Datetime.getCalendar(reminder.time);

        return (
            <span className="reminderListItemComponent">
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
                            { timeString }
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
            </span>
        );
    }
}

export default ReminderListItem;
