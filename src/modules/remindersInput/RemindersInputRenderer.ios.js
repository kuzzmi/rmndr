import Renderer from './RemindersInputRenderer.native.js';

export default function() {
    return Renderer.call(this, this.props, this.state);
}
