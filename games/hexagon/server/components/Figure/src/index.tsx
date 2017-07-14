'use strict';

import './styles.scss';
import { IState } from './state';
import * as React from 'react';

type IProps = {
    [propID: string] : IState;
} & {
    id: string;
}

export class Figure extends React.PureComponent<IProps,{}> {
    render() {
        let id = this.props.id;
        let styles = {
            'transform':  this.props[id].isVisible ? 'scale(1)' : 'scale(0)'
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