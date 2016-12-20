import Renderer from './HeaderRenderer.native.js';

export default function() {
    return Renderer.call(this, this.props, this.state);
}
