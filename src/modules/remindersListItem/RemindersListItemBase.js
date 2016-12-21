import { Component } from 'react';
import { Utils } from '../../app';

class RemindersListItemBase extends Component {
    constructor(props) {
        super(props);
        
        [
            'handleReminderRemove',
            'handleReminderEdit',
        ].forEach(Utils.bind(this));
    }

    handleReminderEdit() {
        const { reminder, editReminder } = this.props;
        editReminder(reminder);
    }

    handleReminderRemove() {
        const { reminder, removeReminder } = this.props;
        removeReminder(reminder);
    }
}

export default RemindersListItemBase;
