'use strict';

import * as fs from 'fs';
import Config, {IConfigEnv} from '../server/src/core/Config';
import GamesList, {IFs} from '../server/src/services/GamesList';

const config: IConfigEnv = Config.init(process.env.NODE_ENV || 'dev');
const gamesList: GamesList = new GamesList(<IFs>fs, (pathToSettings: string) => {
    return require(pathToSettings + ".js");
});

// TODO protocol
let initParams: any = {
    protocol: 'http',
    gamesList: gamesList.getList(),
    port: config.server.port,
    domain: config.server.domain,
    playUrl: config.games.playUrl,
    timeout: config.games.timeout,
    joinGameUrl: config.games.joinGameUrl,
    registrationUrl: config.games.registrationUrl,
    checkGameSessionUrl: config.games.checkGameSessionUrl,
    dropPlayerClientUrl: config.games.dropPlayerClientUrl,
    bayeuxCreateClientUrl: config.server.bayeuxCreateClientUrl,
    bayeuxServerReadyGameUrl: config.server.bayeuxServerReadyGameUrl,
    bayeuxServerDropPlayerUrl: config.server.bayeuxServerDropPlayerUrl,
    bayeuxServerUnreadyGameUrl: config.server.bayeuxServerUnreadyGameUrl,
    clientResponseConnectionInfo: config.games.clientResponseConnectionInfo
};

export default initParams;
