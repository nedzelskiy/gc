'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root/src';
import { getGameSettings } from './core/settings';
import { initState, IAppState } from './core/states';
import Services from '../../../client/common/Services';
import { makeAppProps, initAppLogicActions } from './core/props';

const renderApp = (props: {}) => {
    ReactDOM.render(
        <Root { ...props } >Loading...</Root>,
        document.querySelector('#game-root')
    );
};

getGameSettings().then(gameSettings => {
    let state: IAppState = initState({
        set: function (target: any, property: string, value: {}) {
            target[property] = value;
            renderApp(makeAppProps(gameSettings, state, Services));
            return true;
        }
    });

    initAppLogicActions(gameSettings, state, Services);
    renderApp(makeAppProps(gameSettings, state, Services));
});
