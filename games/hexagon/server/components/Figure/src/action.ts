'use strict';

import { IState } from './state';

export const showFigure = (state: IState): IState => {
    let newState = { ...state };
    newState.isVisible = true;
    return newState
};

export const hideFigure = (state: IState): IState => {
    let newState = { ...state };
    newState.isVisible = false;
    return newState
};