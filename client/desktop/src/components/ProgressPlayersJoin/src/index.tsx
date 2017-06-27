'use strict';

import './styles.scss';
import * as React from 'react';
import { Ii18n, IServices } from '../../Root/src'

export interface IProps {
    readonly maxPlayers: number;
    readonly totalPlayers: number;
}

export class ProgressPlayersJoin extends React.PureComponent<Ii18n & IServices & IProps, null> {
    static propTypes = {
        maxPlayers: React.PropTypes.number.isRequired,
        totalPlayers: React.PropTypes.number.isRequired
    };

    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ;
        return (
            <div className = { this.constructor.name } >
                <div>
                    <p>{S.uFC(t('max number of players')) + ': '}<span className="maxPlayers"></span>{ this.props.maxPlayers }</p>
                </div>
                <div>
                    <p>{S.uFC(t('total number of players')) + ': '}<span className="totalPlayers">{ this.props.totalPlayers }</span></p>
                </div>
            </div>
        )
    }
}