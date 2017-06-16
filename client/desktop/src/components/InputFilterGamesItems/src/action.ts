'use strict';

import { IAction } from './reducer'

export interface IDispatch {
    (param: IAction): void;
}

export interface IFilterGameAction{
    (gameName: string): void;
}

export const filterGameAction: IFilterGameAction = function (gameName: string): void {
    let dispatch: IDispatch = this.dispatch;
    dispatch({ type: 'FILTER_GAME', input: gameName});
};