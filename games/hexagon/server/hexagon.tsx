'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//const store = createStore(reducer, rExt.composeWithDevTools(applyMiddleware(thunk)));

let rootNode = '#game-root';
if (!document.querySelector(rootNode)) {
    let div = document.createElement('div');
    div.setAttribute('id', rootNode);
    document.body.appendChild(div);
}

ReactDOM.render(
    <div className="hexagon__root-wrapper">Hello world!
        {/*<Provider store = {store}>*/}
        {/*</Provider>*/}
    </div>,
    document.querySelector(rootNode)
);