'use strict';

import Services from '../../../src/services/Services';
import {assert, expect} from 'chai';
import * as ip from 'ip';

describe('Services tests', function() {
    it('generateUniqueKey should generate unique key', function(next) {
        let key1 = Services.generateUniqueKey();
        let key2 = Services.generateUniqueKey();
        assert.isFalse(key1 == key2);
        next();
    });
    it('md5Hash should make md5 hash', function(next) {
        let hash1 = Services.md5Hash('test');
        let hash2 = Services.md5Hash('test');
        assert.isTrue(hash1 == hash2);
        assert.isTrue(/^[0-9a-z]+$/.test(hash1));
        next();
    });
});