'use strict';

export interface IPool {
    set(key:string, value: any): void;
    get(key:string): any;
    remove(key:string): void;
}

class Pool implements IPool {

    private _pool: any = {}

    public set(key: string, value: any): void {
        this._pool[key] = value;
    }

    public remove(key: string): void {
        delete this._pool[key];
    }

    public get(key: string): any {
        return this._pool[key];
    }
}

export default class PoolsFabric {
    private static _pool: any = {};
    public constructor() {
        throw new Error('Should use getSingleton method!');
    };

    public static getPool(name: string): Pool {
        if ('undefined' === typeof PoolsFabric._pool[name]) {
            PoolsFabric._pool[name] = new Pool();
        }
        return PoolsFabric._pool[name];
    }
}