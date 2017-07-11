'use strict';

import './styles.scss';
import * as React from 'react';
import { IState } from './state';
import { IGameSettings } from '../../../core/settings';

type IProps = IState & IGameSettings;

export class Cursor extends React.PureComponent<IProps,{}> {
    static defaultProps = {
        destiny: 'cursor'
    };

    static propTypes = {
        cursorTop: React.PropTypes.number.isRequired,
        cursorLeft: React.PropTypes.number.isRequired
    };
    render() {

        let styles: React.CSSProperties = {
            top: `${ this.props.cursorTop }px`,
            left: `${ this.props.cursorLeft }px`,
            width: `${ this.props.blockWidth }px`,
            height: `${ this.props.blockHeight }px`
        };

        return (
            <div
                className = { `${this. constructor.name} ${this.props.isSelected ? 'select-mode': ''}` }
                style = { styles }
                data-id = 'cursor'
            ></div>
        )
    }
}