import React from 'react';

import './RemindersInput.scss';

export default function(props, state) {
    const { rawTitle, id, canSave } = state;

    return (
        <div className="ReminderInputComponent">
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
    );
}
