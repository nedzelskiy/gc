'use strict';

import state, { IState } from './state';

export const showFigure = (id: number, FigureState: Array<IState>): Array<IState> => {
    let newFState = { ...FigureState };
    newFState[id].isVisible = true;
    return newFState;
};

export const hideFigure = (id: number, FigureState: Array<IState>): Array<IState> => {
    let newFState = { ...FigureState };
    newFState[id].isVisible = false;
    return newFState;
};

export const fillMultiState = (countElem: number, figureMultiStates: Array<IState>): void => {
    let i = 0;
    while(i < countElem) {
        figureMultiStates[i] = state;
    }
};