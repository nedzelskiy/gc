'use strict';

import * as path from 'path';

const pathToCurrentFile: string = __dirname;
const pathToGames = path.resolve('./games/');

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

    constructor(fs: IFs) {
        let arrGamesList: string[] = [];
        try {
            arrGamesList = fs.readdirSync(pathToGames);
        } catch (err) {
            console.log(err);
        }
        arrGamesList.forEach((gameName:string) => {
            // denny files - comma exsist in name
            if (gameName.lastIndexOf('.') > -1) return;
            this.list.push({
                name: gameName,
                description: fs.readFileSync(`${pathToGames}/${gameName}/description.txt`, 'UTF-8')
            });
            let settings = JSON.parse(fs.readFileSync(`${pathToGames}/${gameName}/settings.txt`, 'UTF-8'));
            this.settingsList[gameName] = {
                name: gameName,
                settings: settings
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
