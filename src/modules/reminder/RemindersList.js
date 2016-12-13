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
                                    e
                                </button>
                            </div>
                            <div className="info">
                                <div>
                                    { reminder.title }
                                </div>
                                <div>
                                    { reminder.time }
                                </div>
                            </div>
                            <div className="rightButton">
                                <button
                                    onClick={ () => removeReminder(reminder) }>
                                    x
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
