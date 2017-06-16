'use strict';

export enum elementsVisible {Visible, NotVisible}

export interface IAction {
    readonly type: 'HIDE_GAMES_ITEMS_LIST' | 'SHOW_GAMES_ITEMS_LIST';
}

export default (state = elementsVisible.Visible, action: IAction) => {
    if (action.type === 'HIDE_GAMES_ITEMS_LIST') {
        return elementsVisible.NotVisible;
    }
    return state;
};