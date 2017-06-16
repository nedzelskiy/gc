'use strict';

import PoolsFabric from '../../../src/services/PoolsFabric';
import {expect} from 'chai';
import {assert} from 'chai';

describe('SingletonsPoolsFabric tests', function() {
    it('PoolsFabric should generate singletons', function(next) {
        const singleton1 = PoolsFabric.getPool('test1');
        const singleton2 = PoolsFabric.getPool('test1');
        singleton1.set('key1', 'val1');
        expect(singleton1.get('key1')).to.be.equal('val1');
        expect(singleton2.get('key1')).to.be.equal('val1');
        expect(singleton2.get('key2')).to.be.undefined;
        singleton1.set('key2', 'val2');
        expect(singleton2.get('key2')).to.be.equal('val2');
        next();
    });
    it('PoolsFabric can\'t be created with new', function(next) {
        try {
            const singleton = new PoolsFabric();
        } catch (err) {
            next();
        }
    });
    it('singleton pool instanse should has set method', function(next) {
        const singleton = PoolsFabric.getPool('singleton');
        assert.isDefined(singleton.set);
        singleton.set('test', '123');
        expect(singleton.get('test')).to.be.equal('123');
        next();
    });
    it('singleton pool instanse should has get method', function(next) {
        const singleton = PoolsFabric.getPool('singleton');
        assert.isDefined(singleton.get);
        singleton.set('test', '123');
        expect(singleton.get('test')).to.be.equal('123');
        next();
    });
    it('singleton pool instanse should has remove method', function(next) {
        const singleton = PoolsFabric.getPool('singleton');
        assert.isDefined(singleton.remove);
        singleton.set('test', '123');
        expect(singleton.remove('test')).to.be.undefined;
        next();
    });
});