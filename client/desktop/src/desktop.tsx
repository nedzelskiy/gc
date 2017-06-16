'use strict';

import * as Faye from 'faye';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// const { Router, browserHistory } = require('react-router');
// const { syncHistoryWithStore } = require('react-router-redux');
import { createStore, applyMiddleware, combineReducers, ReducersMapObject, Reducer } from 'redux';
// import App from './components/App';
import Root from './components/Root/src';
// import reducer from './reducers';
import * as rExt from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// dynamic load reducers from components
let req = require.context('./components/', true, /reducer\.tsx?$/);
let reducers: ReducersMapObject = {};
req.keys().forEach((v) => {
    let reducer: Reducer<{}> = (req(v) as any)['default'];
    let reducerName : string = v.split('/')[1];
    reducers[reducerName] = reducer;
});


const store = createStore(combineReducers(reducers), rExt.composeWithDevTools(applyMiddleware(thunk)));
// const history = syncHistoryWithStore(browserHistory, store);

interface IClientSettings {
    readonly server_url: string;
    readonly timeout: string;
    readonly registrationUrl: string;
    readonly animationTime: number;
    readonly socketClient: {};
}

const clientSettings: IClientSettings = {
    server_url: 'SERVER_RENDER:protocol:://SERVER_RENDER:domain::SERVER_RENDER:port:',
    timeout: 'SERVER_RENDER:timeout:',
    registrationUrl: 'SERVER_RENDER:registrationUrl:',
    animationTime: 600,
    socketClient: new Faye.Client('SERVER_RENDER:bayeuxCreateClientUrl:', {
        timeout: 'SERVER_RENDER:timeout:'
    })
};

ReactDOM.render(
    <Provider store = {store}>
        <Root />
    </Provider>,
    document.querySelector('#root')
);

