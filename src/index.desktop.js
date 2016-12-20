import React from 'react';
import { render } from 'react-dom';
import { App } from 'app';

import 'app/App.scss';
import 'app/App.desktop.scss';

render(
    <App />,
    document.getElementById('root')
);
