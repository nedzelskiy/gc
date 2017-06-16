'use strict';

import * as shortId from 'shortid';
import * as chance from 'chance';
import * as md5 from 'js-md5';

export default class Services {

    public static generateUniqueKey(): string {
        return shortId.generate() + chance.Chance().guid() + (new Date()).getTime()
    }

    public static md5Hash(str:string): string {
        return md5(str);
    }
}