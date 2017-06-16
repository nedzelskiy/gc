'use strict';

import Logger from '../../../src/services/Logger';
import {expect} from 'chai';


let testMess = 'asdasd534776352342@@4';
describe('Logger tests', () => {
    it('Logger error should console.log a mess', next => {
        let counter = 0;
        let f = console.log;
        console.log = function() {
            for (let key in arguments) {
                ((new RegExp(testMess)).test(arguments[key])) && counter++;
                (/\[ERROR\]:/.test(arguments[key])) && counter++;
            };
        };
        Logger.error(testMess, {'test':'testing'});
        expect(counter).to.be.equal(2);
        console.log = f;
        next();
    });
});

