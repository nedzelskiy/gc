'use strict';

import './styles.scss';
import * as React from 'react';
import { Block } from '../../Block/src';
import { Cursor } from '../../Cursor/src'
import { IGameSettings } from '../../../game';

type IProps = IGameSettings & {
    cursorTop: number;
    cursorLeft: number;
};

export class Board extends React.PureComponent<IProps,{}> {
    static propTypes = {
        cursorTop: React.PropTypes.number.isRequired,
        cursorLeft: React.PropTypes.number.isRequired
    };

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

        let styles = {
            width: `${ this.props.totalHorizontalBlocks * this.props.blockWidth + this.props.horizontalIndent }px`
            ,height: `${ this.props.totalVerticalBlocks * this.props.blockHeight + this.props.verticalIndent }px`,
            paddingTop: `${ this.props.verticalIndent }px`,
            paddingLeft: `${ this.props.horizontalIndent }px`,
        };

        return (
            <div className={ (this.constructor as Function & {name: string}).name } style = { styles }>
                <Cursor
                    id = 'cursor'
                    blockWidth = { this.props.blockWidth }
                    blockHeight = { this.props.blockHeight }
                    top = { this.props.cursorTop }
                    left = {this.props.cursorLeft }
                />
                { arrOfComponents }
            </div>
        )
    }
}