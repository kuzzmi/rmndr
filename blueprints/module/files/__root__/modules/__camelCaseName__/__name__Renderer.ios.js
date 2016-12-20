import Renderer from './<%= pascalEntityName %>Renderer.native.js';

export default function() {
    return Renderer.call(this, this.props, this.state);
}
