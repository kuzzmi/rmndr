import Base from './<%= pascalEntityName %>Base.js';
import Renderer from './<%= pascalEntityName %>Renderer';

export default class <%= pascalEntityName %> extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
