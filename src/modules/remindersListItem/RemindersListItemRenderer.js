import React from 'react';

import { Datetime } from '../../app';

import './RemindersListItem.scss';

import { TimeProgress } from '../timeProgress';

export default function(props) {
    const { reminder } = props;

    const timeString = Datetime.getCalendar(reminder.time);

    return (
        <div className="ReminderListItemComponent">
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
        </div>
    );
}
