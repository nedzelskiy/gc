'use strict';

import './styles.scss';
import * as React from 'react';
import { GameItem } from '../../GameItem/src';
import { Ii18n, IServices } from '../../Root/src'
import { InputFilterGamesItems, IProps as IFG } from '../../InputFilterGamesItems/src'
import { IGameDescribe } from '../../../../../../server/src/services/GamesList';

interface IProps {
    gamesList:  Array<IGameDescribe>;
}

const gameClickHandler = (gameId: string): void => {
  console.log(gameId);
};

export class GamesItemsList extends React.PureComponent<IProps & Ii18n & IServices & IFG, null> {
    static propTypes = {

    };

    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ;
        return (
            <div className = { this.constructor.name }>
                <div className="col-md-12">
                    <p className="lead">{S.uFC(t('list of games'))}</p>
                </div>
                <InputFilterGamesItems {...this.props} />
                <div className="row">
                    <div className="col-md-12">
                        <div className="list-group">
                            {
                                (function(){
                                    if (this.props.gamesList.length > 0 ) {
                                        return this.props.gamesList.map((game: IGameDescribe, i: number) => {
                                            return (
                                                <GameItem key = {i} gameObj = { game } gameClickHandler ={ gameClickHandler }/>
                                            )
                                        });
                                    } else {
                                        return (
                                            <p>{ S.uFC(t('ooops , nothing found!')) }</p>
                                        )
                                    }
                                }).call(this)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// import GameList from './GameList_';
// import {connect} from 'react-redux';
// import {Ii18n} from '../reducers/langPanel';
// import S from '../../../common/S';
// import InputFilterGames from './InputFilterGames';
// import {IGameDescribe} from '../../../../server/src/S/GamesList';
//
// const gameClickHandler = (e: React.SyntheticEvent<HTMLElement>): void  => {
//     let node: HTMLElement = e.currentTarget
//         ,gameName: string = node.getAttribute('data-game') || ''
//         ;
//     if (gameName.length < 1) return;
//     console.log('gameClickHandler', gameName);
// };
//
// interface IAppState {
//     gamesList:  Array<IGameDescribe>;
// }
//
// export const GamesList: React.StatelessComponent<IAppState & Ii18n> = (props): JSX.Element => (

// );
//
// GamesList.propTypes = {
//     gamesList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
// };
//
//
// const mapStateToProps = (state: IAppState & Ii18n) => ({
//     gamesList: state.gamesList,
//     i18n: state.i18n
// });
//
// export default connect<IAppState & Ii18n, {}, {}>(mapStateToProps, undefined)(GamesList);
