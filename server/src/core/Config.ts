import Services from '../services/Services';
import * as ip from 'ip';

export interface IConfigEnv {
    mode: 'development' | 'production';
    server:{
        domain: string;
        port: number;
        defaultLanguage: string;
        bayeuxServerTimeout: number;
        bayeuxCreateClientUrl: string;
        bayeuxServerDropPlayerUrl: string;
        bayeuxServerReadyGameUrl: string;
        bayeuxServerUnreadyGameUrl: string;
        assetsDir: string;
        viewsFormat: string;
    };
    games: {
        registrationUrl:string;
        joinGameUrl:string;
        playUrl:string;
        dropPlayerClientUrl:string;
        timeout: number;
        clientResponseConnectionInfo: string;
        checkGameSessionUrl: string;
    };
    db: {
        connection: string;
    };
};

export interface IConfigAll {
    dev: IConfigEnv;
    prod: IConfigEnv;
};

export default class Config {
    private static settings = <IConfigAll>{
        dev: {
            mode: 'development',
            server: {
                domain: ip.address(),
                port: 4449,
                defaultLanguage: 'ru',
                assetsDir: './server/src/assets/',
                viewsFormat: 'ejs',
                bayeuxCreateClientUrl: '/bayeux',
                bayeuxServerTimeout: 40,
                bayeuxServerDropPlayerUrl: '/drop-player',
                bayeuxServerReadyGameUrl: '/player-ready',
                bayeuxServerUnreadyGameUrl: '/player-unready'
            },
            games: {
                checkGameSessionUrl: '/check-game-session',
                clientResponseConnectionInfo: '/fetch-connection-info',
                registrationUrl: '/register-game',
                joinGameUrl: '/join-game',
                playUrl: '/action',
                dropPlayerClientUrl: '/drop-player-on-client',
                timeout: 120
            },
            db: {
                connection: ''
            }
        },
        prod: {
            mode: 'production',
            server: {
                domain: 'localhost',
                port: process.env.PORT || 80,
                defaultLanguage: 'ru',
                assetsDir: './assets/',
                viewsFormat: 'ejs',
                bayeuxCreateClientUrl: '/bayeux',
                bayeuxServerTimeout: 40,
                bayeuxServerDropPlayerUrl: '/drop-player',
                bayeuxServerReadyGameUrl: '/player-ready',
                bayeuxServerUnreadyGameUrl: '/player-unready'
            },
            games: {
                dropPlayerClientUrl: '/drop-player-on-client',
                checkGameSessionUrl: '/check-game-session',
                clientResponseConnectionInfo: '/fetch-connection-info',
                registrationUrl: '/register-game',
                joinGameUrl: '/join-game',
                playUrl: '/action',
                timeout: 120
            },
            db: {
                connection: ''
            }
        }
    };


    private static switchMode(mode:string):IConfigEnv {
        switch (mode) {
            case 'dev':
            case 'development':
                return Config.settings.dev;
            case 'prod':
            case 'production':
                return Config.settings.prod;
            default:
                return Config.settings.dev;
        }
    };

    public static init(mode:string):IConfigEnv  {
        return Config.switchMode(mode);
    };
};
