'use struct';

import { IAppState } from './states';
import { appComponents } from './states';
import { IGameSettings } from './settings';
import Services from '../../../../client/common/Services';
import { moveCursorRight, moveCursorLeft, moveCursorDown, moveCursorUp, selectCursor } from '../components/Cursor/src/action';

interface IMoveAction{
    leftArrow(): void;
    rightArrow(): void;
    upArrow(): void;
    downArrow(): void;
    enterKey(): void;
}

export interface IAppProps{
    [propName: string]: {}
}
let appProps: IAppProps = {};

export const initAppLogicActions = (gameSettings: IGameSettings, state: IAppState, services: typeof Services):void  => {
    const maxRightCursorPosition: number = gameSettings.blockWidth * gameSettings.totalHorizontalBlocks - gameSettings.blockWidth;
    const maxDownCursorPosition: number = gameSettings.blockHeight * gameSettings.totalVerticalBlocks - gameSettings.blockHeight;
    const moveAction: IMoveAction = {
        leftArrow: (): void => {
            state.Cursor = moveCursorLeft(state.Cursor, gameSettings.blockWidth, 0);
        },
        rightArrow: (): void => {
            state.Cursor = moveCursorRight(state.Cursor, gameSettings.blockWidth, maxRightCursorPosition);
        },
        upArrow: (): void => {
            state.Cursor = moveCursorUp(state.Cursor, gameSettings.blockHeight, 0);
        },
        downArrow: (): void => {
            state.Cursor = moveCursorDown(state.Cursor, gameSettings.blockHeight, maxDownCursorPosition);
        },
        enterKey: (): void => {
            state.Cursor = selectCursor(state.Cursor);
        }
    };

    if (gameSettings.isDebug) {
        document.getElementsByTagName('body')[0].onkeydown = (e: KeyboardEvent): void => {
            let actionName: string = Services.mapKeys(e.keyCode);
            (moveAction as any)[actionName]();
        };
    }
};

export const makeAppProps = (gameSettings: IGameSettings, state: IAppState, services: typeof Services):IAppProps  => {
    appComponents.forEach((componentName: string) => {
        appProps[`${componentName.toLowerCase()}Props`] = state[componentName];
    });
    Object.assign(appProps, gameSettings, {services: services});

    return appProps;
};


