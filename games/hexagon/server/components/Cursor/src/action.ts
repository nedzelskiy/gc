'use strict';

import { IState } from './state';

export const moveCursorRight = (state: IState, blockWidth: number): IState => {
    let newState: IState = {...state};
    let newPosition: number = newState.left + blockWidth;
    newState.left = newPosition;
    return newState;
};