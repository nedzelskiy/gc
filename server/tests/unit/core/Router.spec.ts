'use strict';

import Config, {IConfigEnv} from '../../../src/core/Config';
import {Application} from 'express';
import CreateApp from '../../../src/core/CreateApp';
import Router, {IQRCode, qrCodeCallback} from '../../../src/core/Router';
import PoolsFabric, {IPool} from '../../../src/services/PoolsFabric';
import {expect, assert} from 'chai';
import * as mockHttp from 'node-mocks-http';
import GamesList, {IGameSettings, IFs} from '../../../src/services/GamesList';
import {fsMock} from '../services/GamesList.spec';

const gamesList: GamesList = new GamesList(fsMock);
const qrData = 'data:image/png;base64,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';

let config: IConfigEnv = Config.init(process.env.NODE_ENV || 'dev');
let App: CreateApp = new CreateApp(config);

let gamesPool: IPool = PoolsFabric.getPool('gamesPool');
let clientsPool: IPool = PoolsFabric.getPool('clientsPool');

let qrcodeMock: IQRCode = {
    toDataURL: (strText: string, callback: (err: Error | null, srcBase64: string) => void) => {
        callback(null, qrData);
    }
};
let app: Application = Router.createRoutes(App.getAppWithMiddleware(), config, gamesPool, gamesList, qrcodeMock);
let returnLayer = (route: any, app_: Application) => app_._router.stack.filter((layer: any) => { return layer && layer.route && layer.route.path === route});


describe('Router tests', () => {
    it('route / should render index with clientScriptName param', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let req = mockHttp.createRequest({
            method: 'GET',
            url: '/'
        });
        res.on('end', () => {
            expect(res._getRenderView()).to.be.equal('index');
            expect(res._getStatusCode()).to.be.equal(200);
            assert.isDefined(res._getRenderData().clientScriptName);
            next();
        });
        returnLayer('/', app)[0].route.stack[0].handle(req, res);
    });
    it('route checkGameSessionUrl should return status closed if registerd players >= maxPlayers', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let req = mockHttp.createRequest({
            method: 'POST',
            url: config.games.checkGameSessionUrl
        });
        let id_connection = 'test';
        req.body.id_connection = id_connection;
        gamesPool.set(id_connection, {
            players: [{}],
            settings: {
                maxPlayers: 1
            }
        });
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.status);
            expect(json.status).to.be.equal('closed');
            next();
        });
        returnLayer(config.games.checkGameSessionUrl, app)[0].route.stack[0].handle(req, res);
    });
    it('route checkGameSessionUrl should return status opened and number of free place when registerd players < maxPlayers', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let req = mockHttp.createRequest({
            method: 'POST',
            url: config.games.checkGameSessionUrl
        });
        let id_connection = 'test';
        req.body.id_connection = id_connection;
        gamesPool.set(id_connection, {
            players: [{}],
            settings: {
                maxPlayers: 2
            }
        });
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.status);
            expect(json.status).to.be.equal('open');
            expect(json.freePlaces).to.be.equal(1);
            next();
        });
        returnLayer(config.games.checkGameSessionUrl, app)[0].route.stack[0].handle(req, res);
    });
    it('should return status closed when id_connection is wrong', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let req = mockHttp.createRequest({
            method: 'POST',
            url: config.games.checkGameSessionUrl
        });
        req.body.id_connection = 'eeeee';
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.status);
            assert.isDefined(json.status);
            expect(json.status).to.be.equal('closed');
            next();
        });
        returnLayer(config.games.checkGameSessionUrl, app)[0].route.stack[0].handle(req, res);
    });
    it('should return false if game not exists', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let url = config.games.registrationUrl;
        let req = mockHttp.createRequest({
            method: 'POST',
            url: url
        });
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.success);
            assert.isDefined(json.action);
            assert.isDefined(json.message);
            expect(json.message.length).to.be.greaterThan(6);
            expect(json.success).to.be.false;
            expect(json.action).to.be.equal('register');
            next();
        });
        req.body.gameName = 'hernya';
        returnLayer(url, app)[0].route.stack[0].handle(req, res);
    });
    it('should return qrcode, gameName and maxPlayers if all good', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let url = config.games.registrationUrl;
        let req = mockHttp.createRequest({
            method: 'POST',
            url: url
        });
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.success);
            assert.isDefined(json.data);
            assert.isDefined(json.data.maxPlayers);
            assert.isDefined(json.data.gameName);
            assert.isDefined(json.data.QRData);
            expect(json.data.maxPlayers).to.be.equal(5);
            expect(json.data.QRData).to.be.equal(qrData);
            expect(json.success).to.be.true;
            next();
        });
        req.body.gameName = 'hexagon';
        returnLayer(url, app)[0].route.stack[0].handle(req, res);
    });
    it('should send failure message when qrcode generate failed', next => {
        let res = mockHttp.createResponse({eventEmitter: require('events').EventEmitter});
        let error: Error|null = null;
        qrCodeCallback.reject = (err: Error) => {
            error = err;
        };
        qrCodeCallback.res_ = res;
        qrCodeCallback.func(new Error('testing'), '');
        res.on('end', () => {
            let json = JSON.parse(res._getData());
            assert.isDefined(json.success);
            assert.isDefined(json.message);
            assert.isDefined(json.action);
            expect(json.success).to.be.false;
            expect(json.action).to.be.equal('qr code make');
            if (error) {
                expect(error.message).to.be.equal('testing');
            }
            next();
        });
        res.emit('end');
    });
});
