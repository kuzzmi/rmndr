import { Component } from 'react';
import { bind } from '../../app/utils';

class TimeProgressBase extends Component {

    constructor(props) {
        super(props);

        const ellapsedPercents = this.getPercents(props.since, props.until);

        this.state = {
            width: ellapsedPercents > 100 ? 100 : ellapsedPercents,
        };

        [ 'getPercents', 'tick' ].forEach(bind(this));
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.tick(this.props);
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick({ since, until }) {
        const ellapsedPercents = this.getPercents(since, until);

        if (ellapsedPercents <= 100) {
            this.setState({
                width: ellapsedPercents,
            });
        } else {
            this.setState({
                width: 100,
            });
            clearInterval(this.interval);
        }
    }

    getPercents(since, until) {
        // ms between end and start
        const total = new Date(until).getTime() - since;

        // ms between now and start
        const ellapsed = Date.now() - since;

        // percents of ellapsed time to total
        return ~~( ellapsed / ~~( total / 100 ) );
    }

}

export default TimeProgressBase;
