import { Component } from 'react';
import Renderer from './RemindersListRenderer.js';

export default class RemindersList extends Component {
    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
