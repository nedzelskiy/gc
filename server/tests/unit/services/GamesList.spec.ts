'use strict';

import GamesList, {IFs, IGameDescribe, IGameSettings} from '../../../src/services/GamesList';
import {expect, assert} from 'chai';

const jsonFileMock = '{"maxPlayers":5}';

export const fsMock: IFs = {
    readdirSync: (filename: string, options?: { flag?: string; }): string[] => {
        return ['hexagon'];
    },
    readFileSync: (filename: string, encoding: string): string => {
        return jsonFileMock;
    }
};

const gamesList: GamesList = new GamesList(fsMock);

describe('GamesList', () => {
    it('should return array list of games', next => {
        let gList: IGameDescribe[] = gamesList.getList();
        assert.typeOf(gList, 'array');
        assert.isDefined(gList[0].name);
        assert.isDefined(gList[0].description);
        expect(gList[0].name).to.be.equal('hexagon');
        expect(gList[0].description).to.be.equal(jsonFileMock);
        next();
    });
    it('should return object of games settings', next => {
        let gSList: IGameSettings = gamesList.getSettingsList();
        assert.typeOf(gSList, 'object');
        assert.isDefined(gSList['hexagon']);
        assert.isDefined(gSList['hexagon'].settings);
        assert.typeOf(gSList['hexagon'].settings, 'object');
        assert.isDefined(gSList['hexagon'].name);
        assert.isDefined(gSList['hexagon'].settings.maxPlayers);
        expect(gSList['hexagon'].name).to.be.equal('hexagon');
        expect(gSList['hexagon'].settings.maxPlayers).to.be.equal(5);
        next();
    });
});