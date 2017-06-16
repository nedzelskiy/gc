'use strict';

import './styles.scss';
import * as React from 'react';
import { elementsVisible } from './reducer';
import { GameItem } from '../../GameItem/src';
import { Ii18n, IServices } from '../../Root/src'
import { InputFilterGamesItems, IProps as IFG } from '../../InputFilterGamesItems/src'
import { IGameDescribe } from '../../../../../../server/src/services/GamesList';

interface IProps {
    readonly gamesList: Array<IGameDescribe>;
    readonly visGameItemsList: elementsVisible;
    readonly callbackHideGameItemsList: () => void
}

export class GamesItemsList extends React.PureComponent<IProps & Ii18n & IServices & IFG, null> {
    static propTypes = {
        gamesList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    };

    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ;
        if (this.props.visGameItemsList !== elementsVisible.Visible) {
            S.fadeOut(this.refs[this.constructor.name] as HTMLElement, this.props.callbackHideGameItemsList);
        }
        return (
            <div className = { this.constructor.name } ref = { this.constructor.name } >
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
                                                <GameItem key = {i} gameObj = { game } {...this.props}/>
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