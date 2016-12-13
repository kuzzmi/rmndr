import React, { Component } from 'react';

import { bind, nextId } from 'app/utils.js';
import './ReminderInput.scss';

class ReminderInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            time: ''
        };

        bind(this, 'handleTitleChange');
        bind(this, 'handleTimeChange');
        bind(this, 'handleKeyPress');
        bind(this, 'handleSave');
        bind(this, 'resetState');
    }

    componentWillReceiveProps({ reminder }) {
        if (reminder) {
            const { id, title, time } = reminder;
            this.setState({ id, title, time });
        }
    }

    resetState() {
        this.setState({
            id: '',
            title: '',
            time: ''
        });
    }

    handleSave() {
        const { id, title, time } = this.state;
        if (title) {
            this.props.saveReminder({
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
            <div className="reminderInputComponent">
                <div className="titleInput">
                    <input
                        type="text"
                        value={ title }
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTitleChange }
                        />
                </div>
                <div className="timeInput">
                    <input
                        type="text"
                        value={ time }
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTimeChange }
                        />
                </div>
                <div>
                    <button
                        onClick={ this.handleSave }
                        >
                        +
                    </button>
                </div>
            </div>
        )
    }
}

export default ReminderInput;
