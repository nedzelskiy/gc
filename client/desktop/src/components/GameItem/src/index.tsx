'use strict';

import './styles.scss';
import * as React from 'react';
import S from '../../../../../common/Services';
import { IGameDescribe } from '../../../../../../server/src/services/GamesList';

interface IProps {
    readonly gameObj: IGameDescribe;
    readonly gameClickHandler: (gameId: string) => void;
}

export class GameItem extends React.PureComponent<IProps, null> {
    static propTypes = {
        gameObj: React.PropTypes.object.isRequired,
        gameClickHandler: React.PropTypes.func.isRequired
    };

    gameClickHandler = (gameId: string, e: React.SyntheticEvent<HTMLElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        this.props.gameClickHandler.call(this, gameId);
    };

    render() {
        let gameObj = this.props.gameObj
            ,gameId = gameObj.name.toLowerCase()
            ;

        return (
            <a
                href="#"
                className = { `${this.constructor.name} list-group-item` }
                onClick = { this.gameClickHandler.bind(this, gameId) }
                data-game = { gameId }
            >
                <h2>{ S.uFC(gameObj.name.toLowerCase()) }</h2>
                <p>{ gameObj.description}</p>
            </a>
        )
    }
}
