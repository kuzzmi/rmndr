import React, { Component } from 'react';

import { Utils, Datetime } from 'app';
import './ReminderInput.scss';

class ReminderInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            rawTitle: '',
            time: null,
            created: null,
            canSave: false
        };

        Utils.bind(this, 'handleTitleChange');
        Utils.bind(this, 'handleKeyPress');
        Utils.bind(this, 'handleSave');
        Utils.bind(this, 'resetState');
    }

    componentDidMount() {
        this.input.focus();
    }

    componentWillReceiveProps({ reminder }) {
        if (reminder) {
            const { id, created, title, rawTitle, time } = reminder;
            this.input.focus();
            this.setState({
                id,
                rawTitle,
                title,
                time,
                created,
                canSave: true
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
                created
            });
            this.resetState();
        }
    }

    handleTitleChange(e) {
        const { target: { value } } = e;

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
            this.input.focus();
        }
    }

    render() {
        const { rawTitle, id, canSave } = this.state;

        return (
            <div className="reminderInputComponent">
                <div className="titleInput">
                    <input
                        ref={ e => this.input = e }
                        type="text"
                        value={ rawTitle }
                        placeholder="What and when?"
                        onKeyPress={ this.handleKeyPress }
                        onChange={ this.handleTitleChange }
                        />
                </div>
                <div className="buttonContainer" style={{ maxWidth: canSave ? 100 : 0 }}>
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
