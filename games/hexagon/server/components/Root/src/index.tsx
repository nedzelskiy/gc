'use strict';

import * as Faye from 'faye';
import * as React from 'react';
import { Board } from '../../Board/src';

export interface IGameSettings{
    readonly socketClient: {};
             blockWidth: number;
             blockHeight: number;
             totalVerticalBlocks: number;
             totalHorizontalBlocks: number;
}

const gameSettings: IGameSettings = {
    socketClient:
        new Faye.Client(
            'SERVER_RENDER:protocol:://SERVER_RENDER:domain::SERVER_RENDER:port:SERVER_RENDER:bayeuxCreateClientUrl:',
            {timeout: 'SERVER_RENDER:timeout:'}
        ),
    blockWidth: 35,
    blockHeight: 35,
    totalVerticalBlocks: 5,
    totalHorizontalBlocks: 5
};


export class Root extends React.PureComponent<any, any> {
    render() {
        return(
            <div className = { this.constructor.name }>
                <Board
                    { ...this.props }
                    { ...gameSettings }
                />
            </div>
        )
    }
}