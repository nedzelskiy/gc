'use strict';

import './styles.scss';
import * as React from 'react';
import { Block } from '../../Block/src';
import { Cursor } from '../../Cursor/src'
import { IGameSettings } from '../../Root/src';

type IProps = IGameSettings;

export class Board extends React.PureComponent<IProps,{}> {
    render() {
        let totalBlocks: number = this.props.totalHorizontalBlocks * this.props.totalVerticalBlocks;
        let arrOfComponents: Array<JSX.Element> = [];

        while (arrOfComponents.length < totalBlocks) {
            arrOfComponents.push(
                <Block
                    key = { arrOfComponents.length }
                    id = { arrOfComponents.length }
                    blockWidth = { this.props.blockWidth }
                    blockHeight = { this.props.blockHeight }
                />
            );
        }

        return (
            <div className={ this.constructor.name }>
                <Cursor
                    id = 'cursor'
                    blockWidth = { this.props.blockWidth }
                    blockHeight = { this.props.blockHeight }
                />
                { arrOfComponents }
            </div>
        )
    }
}