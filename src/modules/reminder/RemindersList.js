import React, { Component } from 'react';

import './RemindersList.scss';

class RemindersList extends Component {
    render() {
        const {
            reminders,
            removeReminder,
            editReminder,
        } = this.props;

        return (
            <div className="remindersListComponent">
                <ul>
                {
                    reminders && reminders.map(
                        reminder =>
                        <li key={ reminder.id }>
                            <div className="leftButton">
                                <button
                                    onClick={ () => editReminder(reminder) }>
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
                                    onClick={ () => removeReminder(reminder) }>
                                    <span className="lnr lnr-trash"></span>
                                </button>
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
        );
    }
}

export default RemindersList;
