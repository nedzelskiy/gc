'use strict';

import './styles.scss';
import * as React from 'react';
import { Ii18n, IServices } from '../../Root/src'
import { IFilterGameAction } from './action';

export interface IProps {
    readonly onFilterHandler: IFilterGameAction;
}

export class InputFilterGamesItems extends React.PureComponent<IProps & Ii18n & IServices, null> {
    static propTypes = {
        onFilterHandler: React.PropTypes.func.isRequired
    };

    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ,onFilterHandler = this.props.onFilterHandler
            ;
        return (
            <div className={ `${this.constructor.name} row game-filter-input` }>
                <div className="col-md-12">
                    <div className="input-group input-group">
                            <span className="input-group-addon" id="sizing-addon1">{
                                S.uFC(t('start typing for filtering')) + '...'
                            }</span>
                        <input
                            onChange = {
                                    (function(e: React.SyntheticEvent<HTMLInputElement>){
                                        onFilterHandler(e.currentTarget.value);
                                    })
                                }
                            type = "text"
                            className = "form-control"
                            placeholder = {t('the name of game is') + '...'}
                            aria-describedby = "sizing-addon1"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
