'use strict';

import { elementsVisible } from '../../Root/src';

export interface IAction {
    readonly type: 'HIDE_GAMES_JOIN_AREA_LIST' | 'SHOW_GAMES_JOIN_AREA_LIST';
}

export default (state = elementsVisible.NotVisible, action: IAction) => {
    if (action.type === 'HIDE_GAMES_JOIN_AREA_LIST') {
        return elementsVisible.NotVisible;
    } else if (action.type === 'SHOW_GAMES_JOIN_AREA_LIST') {
        return elementsVisible.Visible;
    }
    return state;
};