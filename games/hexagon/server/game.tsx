'use strict';

import * as Faye from 'faye';
import { initState } from './state';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Board } from './components/Board/src';
import Services from '../../../client/common/Services';
import { moveCursorRight } from './components/Cursor/src/action';

export interface IGameSettings{
    readonly socketClient: {};
    isDebug: boolean;
    blockWidth: number;
    blockHeight: number;
    verticalIndent: number;
    horizontalIndent: number;
    totalVerticalBlocks: number;
    totalHorizontalBlocks: number;
}

let state: {[propName: string]: any} = initState({
    set: function (target: any, property: string, value: {}) {
        target[property] = value;
        renderApp();
        return true;
    }
});

const gameSettings: IGameSettings = {
    isDebug: true,
    socketClient:
        new Faye.Client(
            'SERVER_RENDER:protocol:://SERVER_RENDER:domain::SERVER_RENDER:port:SERVER_RENDER:bayeuxCreateClientUrl:',
            {timeout: 'SERVER_RENDER:timeout:'}
        ),
    blockWidth: 35,
    blockHeight: 35,
    verticalIndent: 2,
    horizontalIndent: 2,
    totalVerticalBlocks: 5,
    totalHorizontalBlocks: 5
};

interface IMoveAction{
    leftArrow() : void;
}

const renderApp = () => {
    ReactDOM.render(
        <Board
            { ...gameSettings }
            cursorTop = { state.Cursor.top }
            cursorLeft = { state.Cursor.left }
        >Loading...</Board>,
        document.querySelector('#game-root')
    );
};

renderApp();

const moveAction: any = {
    rightArrow: (): void => {
        state.Cursor = moveCursorRight(state.Cursor, gameSettings.blockWidth);
    }
};

if (gameSettings.isDebug) {
    document.getElementsByTagName('body')[0].onkeydown = (e: KeyboardEvent): void => {
        let actionName: string = Services.mapKeys(e.keyCode);
        moveAction[actionName]();
    };
}
