'use strict';

import './styles.scss';
import * as Faye from 'faye';
import * as React from 'react';
import {connect} from 'react-redux';
import { WelcomeTop } from '../../WelcomeTop/src/';
import { GameJoinArea } from '../../GameJoinArea/src';
import Services from '../../../../../common/Services';
import { GamesItemsList } from '../../GamesItemsList/src';
import { LangPanel, ILangObj } from '../../LangPanel/src';
import { registerNewGame } from '../../GameItem/src/action';
import { hideGamesList, showGamesList } from '../../GamesItemsList/src/action';
import { showGameJoinArea, hideGameJoinArea } from '../../GameJoinArea/src/action';
import { filterGameAction, IDispatch } from '../../InputFilterGamesItems/src/action';

export enum elementsVisible {Visible, NotVisible}

export interface IServices {
    readonly services: typeof Services
}
export interface Ii18n {
    readonly translatior: (test: string) => string;
}

interface IClientSettings {
    readonly server_url: string;
    readonly timeout: string;
    readonly registrationUrl: string;
    readonly animationTime: number;
    readonly socketClient: {};
}

const clientSettings: IClientSettings = {
    server_url: 'SERVER_RENDER:protocol:://SERVER_RENDER:domain::SERVER_RENDER:port:',
    timeout: 'SERVER_RENDER:timeout:',
    registrationUrl: 'SERVER_RENDER:registrationUrl:',
    animationTime: 600,
    socketClient: new Faye.Client('SERVER_RENDER:bayeuxCreateClientUrl:', {
        timeout: 'SERVER_RENDER:timeout:'
    })
};

// TODO hardcode langs
let langs: Array<ILangObj> = [
    {
        code: 'ru',
        name: 'Рус'
    },
    {
        code: 'en',
        name: 'Eng'
    }
];

let langHandler = (lang: string): void => {
    console.log(lang);
};

const getNewGameCredentionals = (url: string, gameId: string): Promise<never> => {
    return registerNewGame(url, gameId)
    .then((res: any) => {
        if (!res.success) {
            return;
        }
        defaultProps.srcQrCode = res.data.QRData;
        defaultProps.maxPlayers = res.data.maxPlayers;
        defaultProps.gameId = res.data.gameName;
        defaultProps.totalPlayers = 0;
        return new Promise((resolve, reject) => {
            resolve();
        });
    });
};

const mapDispatchToProps = (dispatch: IDispatch) => ({
    onFilterHandler: filterGameAction.bind({dispatch: dispatch}),
    translatior: (test: string): string => test,
    gameClickHandler: function (gameId: string): void {
        getNewGameCredentionals(clientSettings.registrationUrl, gameId).then(hideGamesList.bind({dispatch: dispatch}))
    },
    callbackHideGameItemsList: () => {
        showGameJoinArea.call({dispatch: dispatch});
    },
    generateNewQrHandler: (gameId: string): void => {
        getNewGameCredentionals(clientSettings.registrationUrl, gameId);
    },
    backToGamesListHandler: (e: React.SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        hideGameJoinArea.call({dispatch: dispatch});
        showGamesList.call({dispatch: dispatch});
    }
});

let defaultProps = {
    srcQrCode: '',
    gameId: '',
    maxPlayers: 0,
    totalPlayers: 0
};

// TODO gamesList not correct name
const mapStateToProps = (state: any) => ({
    langs: langs,
    services: Services,
    langHandler: langHandler,
    gamesList: state.InputFilterGamesItems,
    visGameItemsList: state.GamesItemsList,
    visGameJoinArea: state.GameJoinArea,
    srcQrCode: defaultProps.srcQrCode,
    maxPlayers: defaultProps.maxPlayers,
    totalPlayers: defaultProps.totalPlayers,
    gameId: defaultProps.gameId
});

const Root: React.StatelessComponent<any> = (props): JSX.Element => (
    <div>
        <div className="root-wrapper">
            <WelcomeTop { ...props } />
            {/*<LangPanel { ...props } />*/}
            <div className="container content">
                <GamesItemsList { ...props } />
                <GameJoinArea {...props } />
            </div>
        </div>
    </div>
);

export default connect<any, IDispatch, {}>(mapStateToProps, mapDispatchToProps)(Root);