'use strict';

import {IConfigEnv} from './Config';
import {cloneDeep} from 'lodash';
import {IPool} from '../services/PoolsFabric';
import * as faye from 'faye';
import Logger from '../services/Logger';

export interface IMessagePublish {
    readonly player_id:string;
    readonly id_connection:string;
}

export default class Bayeux{
    private static instance: any;
    private static config: IConfigEnv;
    private static clientsPool: IPool;
    private static gamesPool: IPool;


    private static hangEvents(): void {

        const bayeux = Bayeux.instance;
        const config = Bayeux.config;
        const clientsPool = Bayeux.clientsPool;

        bayeux.on('publish', (clientId:string, channel:string, messageObj: IMessagePublish): void => {
            if (!messageObj || !messageObj.id_connection || !messageObj.player_id) {
                // TODO log this and write test
                Logger.error('BAD CLIENT REQUET', {
                    clientId: clientId,
                    channel: channel,
                    message: messageObj
                });
                return;
            }

            let urlForPlayer = messageObj.player_id + messageObj.id_connection;

            switch (channel) {
                case config.games.joinGameUrl:
                    if (!Bayeux.isExistsIdConnection(messageObj.id_connection)) {
                        Bayeux.publishFailureMessage(urlForPlayer, 'There are no register games for this id!', 'join');
                    } else {
                        if (Bayeux.isExistsPlayerId(messageObj.id_connection, messageObj.player_id)) {
                            Bayeux.publishFailureMessage(urlForPlayer, 'Already exist player width this id!', 'join');
                        } else {
                            Bayeux.addNewPlayer(messageObj.id_connection, messageObj.player_id);
                            clientsPool.set(clientId, {
                                id_connection: messageObj.id_connection,
                                player_id: messageObj.player_id
                            });
                            Bayeux.publishConnectionInfoToAll(messageObj.id_connection);
                        }
                    }
                    break;

                case config.server.bayeuxServerDropPlayerUrl:
                    Bayeux.deletePlayer(messageObj.id_connection, messageObj.player_id);
                    Bayeux.sendDropPlayerSignal(urlForPlayer, null);
                    Bayeux.publishConnectionInfoToAll(messageObj.id_connection);
                    break;

                // case config.games.playUrl:
                //     break;

                case config.server.bayeuxServerReadyGameUrl:
                    Bayeux.isExistsIdConnectionAndPlayerId(messageObj.id_connection, messageObj.player_id) &&
                    Bayeux.setPlayerReady(messageObj.id_connection, messageObj.player_id);
                    break;

                case config.server.bayeuxServerUnreadyGameUrl:
                    Bayeux.isExistsIdConnectionAndPlayerId(messageObj.id_connection, messageObj.player_id) &&
                    Bayeux.setPlayerUnready(messageObj.id_connection, messageObj.player_id);
                    break;

            }
        });

        bayeux.on('disconnect', (clientId:string): void => {
            if ('undefined' !== typeof clientsPool.get(clientId)) {
                let player_id = clientsPool.get(clientId).player_id;
                let id_connection = clientsPool.get(clientId).id_connection;
                Bayeux.isExistsIdConnectionAndPlayerId(id_connection, player_id) && Bayeux.deletePlayer(id_connection, player_id);
                clientsPool.remove(clientId);
            }
        });
    };

    private static deletePlayer(id_connection:string, player_id:string): void {
        if (Bayeux.isExistsIdConnectionAndPlayerId(id_connection, player_id)){
            delete Bayeux.gamesPool.get(id_connection).players[player_id];
        }
    };

    private static setPlayerReady(id_connection:string, player_id:string): void {
        Bayeux.gamesPool.get(id_connection).players[player_id].ready = true;
    };

    private static setPlayerUnready(id_connection:string, player_id:string): void {
        Bayeux.gamesPool.get(id_connection).players[player_id].ready = false;
    };

    private static addNewPlayer(id_connection:string, player_id:string): void {
        Bayeux.gamesPool.get(id_connection).players[player_id] = {
            id : player_id,
            id_connection: id_connection,
            ready: false
        };
    };

    private static sendDropPlayerSignal(url:string, opt_message:string | null): void {
        Bayeux.instance.getClient().publish(
            url,
            {
                success: true,
                action: 'drop',
                message: opt_message || 'You successfully have been removed from the list of registered!'
            }
        );
    };

    private static publishFailureMessage(url:string, message:string, action: string): void {
        Bayeux.instance.getClient().publish(
            url,
            {
                success: false,
                action: action,
                message: message
            }
        );
    };

    private static isExistsIdConnection(id_connection:string): boolean {
        return ('undefined' !== typeof Bayeux.gamesPool.get(id_connection));
    };

    private static isExistsPlayerId(id_connection:string, player_id:string): boolean {
        return ('undefined' !== typeof Bayeux.gamesPool.get(id_connection).players[player_id]);
    };

    private static isExistsIdConnectionAndPlayerId(id_connection:string, player_id:string): boolean {
        if (!Bayeux.isExistsIdConnection(id_connection)) {
            return false;
        }
        return Bayeux.isExistsPlayerId(id_connection, player_id);
    };

    private static publishConnectionInfoToAll(id_connection:string): void {
        Bayeux.instance.getClient().publish(
            Bayeux.config.games.clientResponseConnectionInfo + id_connection,
            {
                success: true,
                maxPlayers: Bayeux.gamesPool.get(id_connection).settings.maxPlayers,
                currentPlayers: Object.keys(Bayeux.gamesPool.get(id_connection).players).length
            }
        );
    };

    // TODO
    // private static publishToClient (clientId: string, channel:string, message: string): void {
    //     Bayeux.instance.publish(clientId, channel, {
    //         'hello': 's'
    //     });
    // };



    public static createRoutes(adapter: {}, config: IConfigEnv, gamesPool: IPool, clientsPool: IPool): {[propName: string]: any;} {
        if (!(adapter instanceof faye.NodeAdapter)) {
            throw new Error('adapter should be an instance of faye.NodeAdapter');
        }
        Bayeux.instance = cloneDeep(adapter);
        Bayeux.config = config;
        Bayeux.gamesPool = gamesPool;
        Bayeux.clientsPool = clientsPool;
        Bayeux.hangEvents();
        return Bayeux.instance;
    };
};
