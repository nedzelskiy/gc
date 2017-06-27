'use strict';

import { IAction } from './reducer'

export interface IDispatch {
    (param: IAction): void;
}

export const hideGameJoinArea = function (): void {
    let dispatch: IDispatch = this.dispatch;
    dispatch({ type: 'HIDE_GAMES_JOIN_AREA_LIST'});
};

export const showGameJoinArea = function (): void {
    let dispatch: IDispatch = this.dispatch;
    dispatch({ type: 'SHOW_GAMES_JOIN_AREA_LIST'});
};