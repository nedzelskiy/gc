'use strict';

import { IAction } from './reducer'

export interface IDispatch {
    (param: IAction): void;
}

export interface IFilterGameAction{
    (gameName: string): void;
}

export const changeQrCode = function (gameId: string): void {
    let dispatch: any = this.dispatch;
    const asyncGetQrCode = () => (dispatch: any) => {
        fetch('//')
        dispatch(asyncGetQrCode());
    };

};