import React, { Component } from 'react';

import { bind, nextId } from 'app/utils.js';
import './ReminderInput.scss';

class ReminderInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            time: '09:00'
        };

        bind(this, 'handleTitleChange');
        bind(this, 'handleTimeChange');
        bind(this, 'handleKeyPress');
        bind(this, 'handleSave');
        bind(this, 'resetState');
    }

    componentDidMount() {
        this.input.focus();
    }

    componentWillReceiveProps({ reminder }) {
        if (reminder) {
            const { id, title, time } = reminder;
            this.input.focus();
            this.setState({ id, title, time });
        }
    }

    resetState() {
        this.setState({
            id: '',
            title: '',
            time: '09:00'
        });
    }

    handleSave() {
        const { id, title, time } = this.state;

        if (title && time) {
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
            this.input.focus();
        }
    }

    render() {
        const { title, time, id } = this.state;

        return (
            <div className="reminderInputComponent">
                <div className="titleInput">
                    <input
                        ref={ e => this.input = e }
                        type="text"
                        value={ title }
                        placeholder="What?"
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTitleChange }
                        />
                </div>
                <div className="timeInput">
                    <input
                        type="time"
                        step={ 60 }
                        value={ time }
                        placeholder="When?"
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTimeChange }
                        />
                </div>
                <div>
                    <button
                        onClick={ this.handleSave }
                        >
                        {
                            id ? <span style={{ fontSize: 14 }} className="lnr lnr-pencil"></span> : <span>+</span>
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default ReminderInput;
