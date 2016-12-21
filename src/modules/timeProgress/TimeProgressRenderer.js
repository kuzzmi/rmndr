import React from 'react';

import './TimeProgress.scss';

export default function(props, state) {
    return <div className="TimeProgressComponent" style={{ width: `${ state.width }%` }} />;
}
