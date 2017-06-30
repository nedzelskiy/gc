'use strict';

import {IGameDescribe} from '../../../../../../server/src/services/GamesList';

const initialState: Array<IGameDescribe> = JSON.parse(`SERVER_RENDER:gamesList:`);

export interface IAction {
    readonly type: 'FILTER_GAME';
    readonly input: string;
}

export default (state = initialState, action: IAction) => {
    if (action.type === 'FILTER_GAME') {
        return initialState.filter((game) => {
            return game.name.toLowerCase().indexOf(action.input.toLowerCase()) !== -1;
        });
    }
    return state;
};