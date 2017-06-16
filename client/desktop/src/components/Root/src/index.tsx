'use strict';

import './styles.scss';
import * as React from 'react';
import {connect} from 'react-redux';
import { WelcomeTop } from '../../WelcomeTop/src/';
import Services from '../../../../../common/Services';
import { GamesItemsList } from '../../GamesItemsList/src';
import { LangPanel, ILangObj } from '../../LangPanel/src'
import { filterGameAction, IDispatch } from '../../InputFilterGamesItems/src/action'

export interface IServices {
    readonly services: typeof Services
}
export interface Ii18n {
    readonly translatior: (test: string) => string;
}


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

let obj = {
    test: 'test'
};
const mapDispatchToProps = (dispatch: IDispatch) => ({
    onFilterHandler: filterGameAction.bind({dispatch: dispatch})
});

// TODO gamesList not correct name
const mapStateToProps = (state: any) => ({
    langs: langs,
    services: Services,
    langHandler: langHandler,
    gamesList: state.InputFilterGamesItems,
    translatior: (test: string): string => test
});

const Root: React.StatelessComponent<any> = (props): JSX.Element => (
    <div>
        <div className="root-wrapper">
            <WelcomeTop { ...props } />
            <LangPanel { ...props } />
            <div className="container content">
                <GamesItemsList { ...props } />
            </div>
        </div>
    </div>
);

export default connect<any, IDispatch, {}>(mapStateToProps, mapDispatchToProps)(Root);