import Base from './RemindersListItemBase.js';
import Renderer from './RemindersListItemRenderer';

export default class RemindersListItem extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return Renderer.call(this, this.props, this.state);
    }
}
