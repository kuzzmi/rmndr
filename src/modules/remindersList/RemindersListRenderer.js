import React from 'react';
import FlipMove from 'react-flip-move';

import './RemindersList.scss';

import { RemindersListItem } from '../remindersListItem';

export default props =>
    <div className="RemindersListComponent">
        <FlipMove
            staggerDurationBy={ 10 }
            duration={ 120 }
            maintainContainerHeight={ true }
            typeName="ul">
            {
                props.reminders && props.reminders.map(reminder =>
                    <li key={ reminder.id }>
                        <RemindersListItem
                            removeReminder={ props.removeReminder }
                            editReminder={ props.editReminder }
                            reminder={ reminder }
                            />
                    </li>
                )
            }
        </FlipMove>
    </div>;
