'use strict';
import Bayeux, {IMessagePublish} from '../../../src/core/Bayeux';
import PoolsFabric, {IPool} from '../../../src/services/PoolsFabric';
import Config, {IConfigEnv} from '../../../src/core/Config';
import {assert} from 'chai';
import {expect} from 'chai';
import * as faye from 'faye';
import Logger from '../../../src/services/Logger';

let resultPublishInfo: any = {
    channel: {},
    messageObj: {},
    clean: function() {
        this.channel = {};
        this.messageObj = {};
    }
};

const bayeux_ = new faye.NodeAdapter({
    mount: '/ndsfesrfk445345',
    timeout: 30
});


bayeux_.throwEvents = {};
bayeux_.on = function (eventName: string, callback: (clientId:string, channel:string, messageObj: {}) => void) {
    this.throwEvents[eventName] = callback;
};

bayeux_.publish = function(channel: string, messageObj: {}) {
    resultPublishInfo.channel[channel] = channel;
    resultPublishInfo.messageObj[channel] = messageObj;
}

bayeux_.getClient = function() {
    return {
        publish: this.publish.bind(this)
    };
};

const messageObj: IMessagePublish = {
    player_id: '123',
    id_connection: 'testing'
};
const clientId = 'erewdewr34234';

const config: IConfigEnv = Config.init(process.env.NODE_ENV || 'dev');
const gamesPool: IPool = PoolsFabric.getPool('gamesPool');
const clientsPool: IPool = PoolsFabric.getPool('clientsPool');

describe('Bayeux setup', () => {
    it('should be instance of NodeAdapter', next => {
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        assert.isTrue(bayeux instanceof faye.NodeAdapter);
        try {
            let bayeux1 = Bayeux.createRoutes({}, config, gamesPool, clientsPool);
        } catch (err) {
            next();
        }
    });
    it('should drop player from gamesPool and send 2 signals: one to all, one to player', next => {
        gamesPool.set(messageObj.id_connection, {
            players: {},
            settings: {
                maxPlayers: 3
            }
        });
        gamesPool.get(messageObj.id_connection).players[messageObj.player_id] = messageObj.player_id;
        gamesPool.get(messageObj.id_connection).players['124'] = '124';

        let urlForAll = config.games.clientResponseConnectionInfo + messageObj.id_connection;
        let urlForPlayer = messageObj.player_id + messageObj.id_connection;

        expect(gamesPool.get(messageObj.id_connection).players[messageObj.player_id]).to.be.equal('123');
        expect(gamesPool.get(messageObj.id_connection).players['124']).to.be.equal('124');

        resultPublishInfo.clean();
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        bayeux.throwEvents.publish(clientId, config.server.bayeuxServerDropPlayerUrl, messageObj);

        expect(gamesPool.get(messageObj.id_connection).players[messageObj.player_id]).to.be.undefined;
        assert.isDefined(gamesPool.get(messageObj.id_connection).players['124']);

        expect(resultPublishInfo.channel[urlForAll]).to.be.equal(urlForAll);
        assert.isTrue(resultPublishInfo.messageObj[urlForAll].success);
        expect(resultPublishInfo.messageObj[urlForAll].maxPlayers).to.be.equal(3);
        expect(resultPublishInfo.messageObj[urlForAll].currentPlayers).to.be.equal(1);

        expect(resultPublishInfo.channel[urlForPlayer]).to.be.equal(urlForPlayer);
        expect(resultPublishInfo.messageObj[urlForPlayer].action).to.be.equal('drop');
        assert.isDefined(resultPublishInfo.messageObj[urlForPlayer].message);
        expect(resultPublishInfo.messageObj[urlForPlayer].message.length).to.be.greaterThan(5);
        assert.isTrue(resultPublishInfo.messageObj[urlForPlayer].success);
        next();
    });
    it('player should can mark himself as ready', next => {
        let player_id = messageObj.player_id;
        gamesPool.set(messageObj.id_connection, {
            players: {}
        });
        gamesPool.get(messageObj.id_connection).players[player_id] = {
            ready: false
        };
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);

        assert.isFalse(gamesPool.get(messageObj.id_connection).players[player_id].ready);
        bayeux.throwEvents.publish(clientId, config.server.bayeuxServerReadyGameUrl, messageObj);
        assert.isTrue(gamesPool.get(messageObj.id_connection).players[player_id].ready);
        next();
    });
    it('player should can mark himself as unready', next => {
        let player_id = messageObj.player_id;
        gamesPool.set(messageObj.id_connection, {
            players: {}
        });
        gamesPool.get(messageObj.id_connection).players[player_id] = {
            ready: true
        };
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);

        assert.isTrue(gamesPool.get(messageObj.id_connection).players[player_id].ready);
        bayeux.throwEvents.publish(clientId, config.server.bayeuxServerUnreadyGameUrl, messageObj);
        assert.isFalse(gamesPool.get(messageObj.id_connection).players[player_id].ready);
        next();
    });
    it('should check isExistsIdConnection', next => {
        let player_id = messageObj.player_id;
        gamesPool.remove(messageObj.id_connection);
        gamesPool.set('hernya', {
            players: {},
            settings: {
                maxPlayers: 4
            }
        });

        resultPublishInfo.clean();
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        let urlForPlayer = messageObj.player_id + messageObj.id_connection;

        bayeux.throwEvents.publish(clientId, config.games.joinGameUrl, messageObj);
        assert.isFalse(resultPublishInfo.messageObj[urlForPlayer].success);
        expect(resultPublishInfo.messageObj[urlForPlayer].action).to.be.equal('join');
        next();
    });
    it('should check isExistsPlayerId', next => {
        let player_id = messageObj.player_id;
        gamesPool.set(messageObj.id_connection, {
            players: {},
            settings: {
                maxPlayers: 4
            }
        });

        gamesPool.get(messageObj.id_connection).players[player_id] = player_id;
        resultPublishInfo.clean();
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        let urlForPlayer = messageObj.player_id + messageObj.id_connection;

        bayeux.throwEvents.publish(clientId, config.games.joinGameUrl, messageObj);
        assert.isFalse(resultPublishInfo.messageObj[urlForPlayer].success);
        expect(resultPublishInfo.messageObj[urlForPlayer].action).to.be.equal('join');
        next();
    });
    it('should add new player', next => {
        let player_id = messageObj.player_id;
        gamesPool.set(messageObj.id_connection, {
            players: {},
            settings: {
                maxPlayers: 4
            }
        });

        resultPublishInfo.clean();
        clientsPool.remove(clientId);
        assert.isUndefined(clientsPool.get(clientId));
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        bayeux.throwEvents.publish(clientId, config.games.joinGameUrl, messageObj);
        assert.isDefined(clientsPool.get(clientId));
        expect(clientsPool.get(clientId).id_connection).to.be.equal(messageObj.id_connection);
        expect(clientsPool.get(clientId).player_id).to.be.equal(messageObj.player_id);
        expect(gamesPool.get(messageObj.id_connection).players[messageObj.player_id].id).to.be.equal(messageObj.player_id);
        expect(gamesPool.get(messageObj.id_connection).players[messageObj.player_id].id_connection).to.be.equal(messageObj.id_connection);
        expect(gamesPool.get(messageObj.id_connection).players[messageObj.player_id].ready).to.be.equal(false);
        next();
    });
    it('delete player when disconnect', next => {
        gamesPool.set(messageObj.id_connection, {
            players: {},
            settings: {
                maxPlayers: 4
            }
        });
        clientsPool.remove(clientId);
        clientsPool.set(clientId, {
            player_id: messageObj.player_id,
            id_connection: messageObj.id_connection
        });
        gamesPool.get(messageObj.id_connection).players[messageObj.player_id] = messageObj.player_id;
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        assert.isDefined(clientsPool.get(clientId));
        bayeux.throwEvents.disconnect(clientId);
        assert.isUndefined(clientsPool.get(clientId));
        next();
    });
    it('don\'t delete player if wrong player_id or connection_id', next => {
        gamesPool.set(messageObj.id_connection, {
            players: {},
            settings: {
                maxPlayers: 4
            }
        });
        clientsPool.remove(clientId);
        clientsPool.set(clientId, {
            player_id: messageObj.player_id,
            id_connection: 'hernywa'
        });
        gamesPool.get(messageObj.id_connection).players[messageObj.player_id] = messageObj.player_id;
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        bayeux.throwEvents.disconnect(clientId);
        assert.isDefined(gamesPool.get(messageObj.id_connection).players[messageObj.player_id]);
        next();
    });
    it('should logged error when messageObj is wrong', next => {
        let f = Logger.error;
        Logger.error = (mess, obj: any) => {
            expect(mess.length).to.be.greaterThan(6);
            expect(obj.clientId).to.be.equal(clientId);
            Logger.error = f;
            next();
        };
        let bayeux = Bayeux.createRoutes(bayeux_, config, gamesPool, clientsPool);
        bayeux.throwEvents.publish(clientId);
    });
});