'use strict';

import * as fs from 'fs';
import {IConfigEnv} from './Config';
import {IPool} from '../services/PoolsFabric';
import Services from '../services/Services';
import GameList, {IGameSettings} from '../services/GamesList';
import {Request, Response, Application} from 'express';


export interface IQRCode {
    toDataURL(strText: string, callback: (err: Error, srcBase64: string) => void) : void;
}

export default class Router {
    public static createRoutes(app: Application, config:IConfigEnv, gamesPool: IPool, gamesList: GameList, QRCode: IQRCode): Application  {
        // TODO hardcode desktop-bundle
        // TODO hardcode lang
        app.get('/', (req: Request, res: Response): void => {
            let lang = 'en';
            res.render('index', {
                clientScriptName: 'desktop-bundle.js',
                clientStylesName: 'styles.css',
                clientTranslationName: '/i18n/' + lang + '.js'
            });
        });

        app.post(
            config.games.checkGameSessionUrl,
            (req: Request, res: Response): void => {
                const id_connection: string = req.body.id_connection;
                ('undefined' === typeof gamesPool.get(id_connection)) && res.json({status: 'closed'});
                if ('undefined' === typeof gamesPool.get(id_connection)) {
                    return;
                }
                let countConnectedPlayers: number = Object.keys(gamesPool.get(id_connection).players).length;
                (gamesPool.get(id_connection).settings.maxPlayers - countConnectedPlayers < 1) &&
                    res.json({status: 'closed'});

                res.json({
                    status: 'open',
                    freePlaces: gamesPool.get(id_connection).settings.maxPlayers - countConnectedPlayers
                });
            }
        );

        app.post(
            config.games.registrationUrl,
            (req: Request, res: Response): void => {
                const gameName: string = req.body.gameName;
                let gameSettingsList: IGameSettings = gamesList.getSettingsList();
                if ('undefined' === typeof gameSettingsList[gameName]) {
                    sendFailureMessage('This game doesn\'t exist!', 'register', res);
                    return;
                }
                const id_connection: string = Services.md5Hash(Services.generateUniqueKey());
                new Promise((resolve, reject) => {
                    qrCodeCallback.resolve = resolve;
                    qrCodeCallback.reject = reject;
                    qrCodeCallback.res_ = res;
                    QRCode.toDataURL(id_connection, qrCodeCallback.func);
                })
                .then(srcQRCode => {
                    gamesPool.set(id_connection, {
                        gameName: gameName,
                        settings: gameSettingsList[gameName].settings,
                        players: {}
                    });

                    res.json({
                        'success': true,
                        'data': {
                            'gameName': gameName,
                            'QRData': srcQRCode,
                            'key': id_connection,
                            'maxPlayers': gameSettingsList[gameName].settings.maxPlayers
                        }
                    });
                });
            }
        );
        return app;
    }
}

export interface IQrCodeCallback {
    func(err: Error, srcQRCode: string): void;
    resolve(srcQRCode: string): void;
    reject(err: Error): void;
    res_: Response;
}

export const qrCodeCallback = <IQrCodeCallback>{
    func: (err: Error, srcQRCode: string): void => {
        err && sendFailureMessage('error with making another qrcode!', 'qr code make', qrCodeCallback.res_);
        err && qrCodeCallback.reject(err);
        !err && qrCodeCallback.resolve(srcQRCode);
    }
}





const sendFailureMessage = (mess: string, action: string, res: Response): void => {
    res.json({
        success: false,
        message: mess,
        action: action
    });
}