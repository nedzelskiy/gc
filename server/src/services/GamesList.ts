'use strict';

import * as path from 'path';

const pathToCurrentFile: string = __dirname;
const pathToGames = path.resolve(pathToCurrentFile + '../../games/');

export interface IGameDescribe {
    name: string;
    description: string;
}

export interface IGameSettings {
    [gameName: string]: {
        name: string;
        settings: {
            maxPlayers: number;
        };
    }
}

export interface IFs {
    readdirSync(filename: string, options?: { flag?: string; }): string[];
    readFileSync(filename: string, options?: { flag?: string; encoding?: string } |string): string;
}


export default class GamesList {

    private list: IGameDescribe[] = [];
    private settingsList: IGameSettings = {};

    constructor(fs: IFs, getterGameSettings: (pathToSettings: string) => any) {
        let arrGamesList: string[] = [];
        try {
            arrGamesList = fs.readdirSync(pathToGames);
        } catch (err) {}
        arrGamesList.forEach((gameName:string) => {
            this.list.push({
                name: gameName,
                description: fs.readFileSync(`${pathToGames}/${gameName}/description.txt`, 'UTF-8')
            });
            this.settingsList[gameName] = {
                name: gameName,
                settings: getterGameSettings(`${pathToGames}/${gameName}/settings`)
            };
        });
    };

    public getList(): IGameDescribe[] {
        return this.list;
    }

    public getSettingsList(): IGameSettings {
        return this.settingsList;
    }
}
