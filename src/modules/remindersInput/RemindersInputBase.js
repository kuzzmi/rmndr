import { Component } from 'react';
import { Utils, Datetime } from '../../app';

class RemindersInputBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            rawTitle: '',
            time: null,
            created: null,
            canSave: false,
        };

        [
            'handleTitleChange',
            'handleKeyPress',
            'handleSave',
            'resetState',
        ].forEach(Utils.bind(this));
    }

    componentWillReceiveProps({ reminder }) {
        if (reminder) {
            const { id, created, title, rawTitle, time } = reminder;
            // this.input.focus();
            this.setState({
                id,
                rawTitle,
                title,
                time,
                created,
                canSave: true,
            });
        }
    }

    resetState() {
        this.setState({
            id: '',
            title: '',
            rawTitle: '',
            time: null,
            created: null,
            canSave: false,
        });
    }

    handleSave() {
        const { id, title, rawTitle, time, created, canSave } = this.state;

        if (canSave) {
            this.props.saveReminder({
                id,
                title,
                rawTitle,
                time,
                created,
            });
            this.resetState();
        }
    }

    handleTitleChange(e) {
        // Getting a value from either native or web platform event
        const value = typeof e === 'string' ? e : e.target.value;

        const { title, dates } = Datetime.parse(value);

        if (dates) {
            this.setState({
                title,
                rawTitle: value,
                time: dates[0].start.date(),
                canSave: true,
            });
        } else {
            this.setState({
                title: value,
                rawTitle: value,
                canSave: false,
            });
        }
    }

    handleKeyPress({ key }) {
        if (key === 'Enter') {
            this.handleSave();
            // this.input.focus();
        }
    }
}

export default RemindersInputBase;
