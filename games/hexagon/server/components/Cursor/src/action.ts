'use strict';

import { IState } from './state';

export const moveCursorRight = (state: IState, blockWidth: number, maxRightPosition: number): IState => {
    let newState: IState = {...state};
    let newPosition: number = newState.cursorLeft + blockWidth;
    if (newPosition > maxRightPosition) {
        return newState;
    }
    newState.cursorLeft = newPosition;
    return newState;
};

export const moveCursorLeft = (state: IState, blockWidth: number, minLeftPosition: number): IState => {
    let newState: IState = {...state};
    let newPosition: number = newState.cursorLeft - blockWidth;
    if (newPosition < minLeftPosition) {
        return newState;
    }
    newState.cursorLeft = newPosition;
    return newState;
};


export const moveCursorUp = (state: IState, blockHeight: number, minTopPosition: number): IState => {
    let newState: IState = {...state};
    let newPosition: number = newState.cursorTop - blockHeight;
    if (newPosition < minTopPosition) {
        return newState;
    }
    newState.cursorTop = newPosition;
    return newState;
};

export const moveCursorDown = (state: IState, blockHeight: number, maxDownPosition: number): IState => {
    let newState: IState = {...state};
    let newPosition: number = newState.cursorTop + blockHeight;
    if (newPosition > maxDownPosition) {
        return newState;
    }
    newState.cursorTop = newPosition;
    return newState;
};

export const selectCursor = (state: IState): IState => {
    let newState: IState = {...state};
    newState.isSelected = !newState.isSelected;
    return newState;
};