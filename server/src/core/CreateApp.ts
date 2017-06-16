import * as express from 'express';
import {IConfigEnv} from './Config';
import * as bodyParser from 'body-parser';

export const setAllAllowAccessHeader = {
    func: function (res: express.Response, mode:string) {
        if (mode === 'development') {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        this.isCalled = true;
        return res;
    },
    isCalled: false
};

let app:express.Application;

export default class CreateApp {
    private config: IConfigEnv;
    private app: express.Application;

    public constructor(config:IConfigEnv) {
        this.config = config;
        !app && (app = express());
        this.app = app;
        this.devMiddleware = this.devMiddleware.bind(this);
    };

    public getApp(): express.Application {
        return this.app;
    };

    public getConfig(): IConfigEnv {
        return this.config;
    };

    public devMiddleware = function devMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
        setAllAllowAccessHeader.func(res, this.config.mode);
        next();
    };

    public getAppWithMiddleware(): express.Application {
        this.app.use(this.devMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        if (this.config.mode === 'development') {
            this.app.use(express.static('./build/client'));
            this.app.use(express.static('./node_modules'));
        }
        return this.app;
    };
};


