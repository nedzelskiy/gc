'use strict';

import * as Faye from 'faye';

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

export const getGameSettings = (): Promise<IGameSettings> => {
    return new Promise((resolve: (settings: IGameSettings) => void, reject) => {
        resolve(gameSettings);
    });
};