'use struct';

import { IAppState } from './states';
import { appComponents } from './states';
import { IGameSettings } from './settings';
import figureState, { IState as IFigureState } from '../components/Figure/src/state';
import Services from '../../../../client/common/Services';
import { moveCursorRight, moveCursorLeft, moveCursorDown, moveCursorUp, selectCursor } from '../components/Cursor/src/action';
import { hideFigure, showFigure } from '../components/Figure/src/action';

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

let dispatchMapToProps: any = {};

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

    // // make arr of figures states
    // let figureStates: {
    //     [id: string]:IFigureState
    // } = {};
    // let totalBlocks: number = gameSettings.totalHorizontalBlocks * gameSettings.totalVerticalBlocks;
    // for (let i = 0; i<totalBlocks; i++) {
    //     figureStates[`${i}`] = figureState;
    // }
    // state.Figure = figureStates;

    dispatchMapToProps.makeBlockVisible = (id: string) => {
        console.log(state.Figure[id]);
        state.Figure[id] = showFigure(state.Figure[id]);
        console.log(state.Figure[id]);
    };

    if (gameSettings.isDebug) {
        document.getElementsByTagName('body')[0].onkeydown = (e: KeyboardEvent): void => {
            let actionName: string = Services.mapKeys(e.keyCode);
            ('undefined' !== typeof (<any>moveAction)[actionName])
                && ('function' === typeof (<any>moveAction)[actionName])
                    && (<any>moveAction)[actionName]();
        };
    }
};

export const makeAppProps = (gameSettings: IGameSettings, state: IAppState, services: typeof Services):IAppProps  => {
    appComponents.forEach((componentName: string) => {
        appProps[`${componentName.toLowerCase()}Props`] = state[componentName];
    });
    (<any>Object).assign(appProps, gameSettings, {services: services}, dispatchMapToProps);

    return appProps;
};


