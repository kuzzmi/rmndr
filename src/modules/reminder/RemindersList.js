import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import './RemindersList.scss';

import ReminderListItem from './ReminderListItem.js';

const RemindersList = ({ reminders, removeReminder, editReminder }) =>
    <div className="remindersListComponent">
        <FlipMove
            staggerDurationBy={ 10 }
            duration={ 120 }
            maintainContainerHeight={ true }
            typeName="ul">
            {
                reminders && reminders.map(reminder =>
                    <li key={ reminder.id }>
                        <ReminderListItem
                            removeReminder={ removeReminder }
                            editReminder={ editReminder }
                            reminder={ reminder }
                            />
                    </li>
                )
            }
        </FlipMove>
    </div>;

export default RemindersList;
