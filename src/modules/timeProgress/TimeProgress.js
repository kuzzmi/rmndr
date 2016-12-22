import Base from './TimeProgressBase.js';
import Renderer from './TimeProgressRenderer';

export default class TimeProgress extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
