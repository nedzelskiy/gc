'use strict';

import Config, {IConfigEnv} from '../../../src/core/Config';
import Services from '../../../src/services/Services';
import {expect} from 'chai';
import {assert} from 'chai';

describe('Configuration setup', () => {
    it('should load development configurations', next => {
        let config: IConfigEnv = Config.init('dev');
        assert.isDefined(config.mode);
        expect(config.mode).to.equal('development');
        next();
    });
    it('should load production configurations', next => {
        let config: IConfigEnv = Config.init('prod');
        assert.isDefined(config.mode);
        expect(config.mode).to.equal('production');
        next();
    });
    it('should be development mode by default', next => {
        let config: IConfigEnv = Config.init('sd');
        assert.isDefined(config.mode);
        expect(config.mode).to.equal('development');
        next();
    });
    it('in prod mode domian should should be localhost always', next => {
        let config: IConfigEnv = Config.init('prod');
        expect(config.mode).to.be.equal('production');
        expect(config.server.domain).to.be.equal('localhost');
        next();
    });
    it('in dev mode domian should be ip', next => {
        let config: IConfigEnv = Config.init('dev');
        expect(config.mode).to.be.equal('development');
        expect(config.server.domain).to.match(/^[0-9.]+$/);
        next();
    });
});

