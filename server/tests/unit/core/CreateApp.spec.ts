'use strict';

import Config, {IConfigEnv} from '../../../src/core/Config';
import CreateApp, {setAllAllowAccessHeader} from '../../../src/core/CreateApp';
import {assert, expect} from 'chai';

let res: any = {};
let req: any = {};
let tmp_: any = {};
res.setHeader = (key: string, value: string) => {
    tmp_[key] = value;
};

const appCreatorDev: CreateApp = new CreateApp(Config.init('dev'));
const appCreatorProd: CreateApp = new CreateApp(Config.init('prod'));

describe('Middleware tests', () => {
    it('shouldn\'t set Access-Control-Allow-Origin * in production mode ', next => {
        tmp_ = {};
        const config: IConfigEnv = Config.init('prod');
        expect(config.mode).to.be.equal('production');
        setAllAllowAccessHeader.func(res, config.mode);
        assert.isUndefined(tmp_['Access-Control-Allow-Origin']);
        next();
    });
    it('should set Access-Control-Allow-Origin * in development mode ', next => {
        tmp_ = {};
        const config: IConfigEnv = Config.init('dev');
        expect(config.mode).to.be.equal('development');
        setAllAllowAccessHeader.func(res, config.mode);
        assert.isDefined(tmp_['Access-Control-Allow-Origin']);
        expect(tmp_['Access-Control-Allow-Origin']).to.be.equal('*');
        next();
    });
    it('should use devMiddleware, bodyParser, urlencode and static middlewares', next => {
        let appProd = appCreatorProd.getAppWithMiddleware();
        let devMiddleware = false;
        let jsonParser = false;
        let urlencodedParser = false;
        let serveStatic = false;
        appProd._router.stack.filter((handler: any) => {
            (handler.name.indexOf('devMiddleware') > -1) && (devMiddleware = true);
            ('jsonParser' === handler.name) && (jsonParser = true);
            ('urlencodedParser' === handler.name) && (urlencodedParser = true);
            ('serveStatic' === handler.name) && (serveStatic = true);
        });
        expect(devMiddleware).to.be.true;
        expect(jsonParser).to.be.true;
        expect(urlencodedParser).to.be.true;
        expect(serveStatic).to.be.true;
        next();
    });
    it('getApp should return the same instance of app', next => {
        let appProd: any = <any>appCreatorProd.getApp();
        let appDev: any = <any>appCreatorDev.getApp();
        appProd.test_ = 'testing';
        expect(appProd).equal(appDev);
        expect(appProd.test_).equal('testing');
        expect(appCreatorDev.getConfig().mode).equal('development');
        expect(appCreatorProd.getConfig().mode).equal('production');
        expect(appCreatorProd.getConfig().mode).not.equal(appCreatorDev.getConfig().mode);
        next();
    });
    it('devMiddleware should be call setAllAllowAccessHeader middleware', next => {
        const config: IConfigEnv = Config.init('prod');
        setAllAllowAccessHeader.isCalled = false;
        tmp_ = {};
        appCreatorDev.devMiddleware(req, res, () => {
            assert.isTrue(setAllAllowAccessHeader.isCalled);
            expect(tmp_['Access-Control-Allow-Origin']).to.be.equal('*');
            tmp_ = {};
            appCreatorProd.devMiddleware(req, res, () => {
                assert.isTrue(setAllAllowAccessHeader.isCalled);
                assert.isUndefined(tmp_['Access-Control-Allow-Origin']);
                next();
            });
        });
    });
});