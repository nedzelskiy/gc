'use strict';

import './styles.scss';
import { IState } from './state';
import * as React from 'react';

type IProps = {
    FigureMultiStates: Array<IState>
} & {
    id: number;
}

export class Figure extends React.PureComponent<IProps,{}> {
    render() {
        console.log(this.props.FigureMultiStates);
        let id: number = this.props.id;
        let styles = {
            'transform':  this.props.FigureMultiStates[id].isVisible ? 'scale(1)' : 'scale(0)'
        };

        return (
            <div
                data-id = { id }
                className = { this.constructor.name }
                style = { styles }
            ></div>
        )
    }
}