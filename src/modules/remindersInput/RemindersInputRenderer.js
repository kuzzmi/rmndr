import React from 'react';

import './RemindersInput.scss';

export default function(props, state) {
    const { rawTitle, id, canSave } = state;

    const pencil =
        <span style={{ fontSize: 14 }} className="lnr lnr-pencil"></span>;

    return (
        <div className="ReminderInputComponent">
            <div className="titleInput">
                <input
                    ref={ e => e && e.focus() }
                    type="text"
                    value={ rawTitle }
                    placeholder="What and when?"
                    onKeyPress={ this.handleKeyPress }
                    onChange={ this.handleTitleChange }
                    />
            </div>
            <div className="buttonContainer" style={{ maxWidth: canSave ? 100 : 0 }}>
                <button
                    onClick={ this.handleSave }>
                    {
                        id ? pencil : <span>+</span>
                    }
                </button>
            </div>
        </div>
    );
}
