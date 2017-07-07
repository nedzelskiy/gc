'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './components/Root/src';

ReactDOM.render(
    <div className="hexagon__root-wrapper">
        <Root />
    </div>,
    document.querySelector('#game-root')
);