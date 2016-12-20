import { Component } from 'react';
import Renderer from './HeaderRenderer';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
