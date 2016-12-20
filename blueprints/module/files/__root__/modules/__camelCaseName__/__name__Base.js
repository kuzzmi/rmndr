import { Component } from 'react';
import { Utils } from '../../app';

class <%= pascalEntityName %>Base extends Component {
    constructor(props) {
        super(props);
        
        [
        ].forEach(Utils.bind(this));
    }
}

export default <%= pascalEntityName %>Base;
