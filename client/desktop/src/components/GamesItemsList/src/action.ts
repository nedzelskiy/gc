'use strict';

import { IAction } from './reducer'

export interface IDispatch {
    (param: IAction): void;
}

export const hideGamesList = function (): void {
    let dispatch: IDispatch = this.dispatch;
    dispatch({ type: 'HIDE_GAMES_ITEMS_LIST'});
};