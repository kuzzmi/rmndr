import Base from './RemindersInputBase.js';
import Renderer from './RemindersInputRenderer.js';

export default class RemindersInput extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
