'use strict';

import './styles.scss';
import * as React from 'react';
import { Block } from '../../Block/src';
import { Cursor } from '../../Cursor/src'
import { IGameSettings } from '../../../core/settings';

type IProps = IGameSettings & {
    cursorProps: any;
};

export class Board extends React.PureComponent<IProps,{}> {

    render() {
        let totalBlocks: number = this.props.totalHorizontalBlocks * this.props.totalVerticalBlocks;
        let arrOfComponents: Array<JSX.Element> = [];
        while (arrOfComponents.length < totalBlocks) {
            arrOfComponents.push(
                <Block
                    { ...this.props }
                    key = { arrOfComponents.length }
                    id = { arrOfComponents.length }
                />
            );
        }

        let styles = {
            width: `${ this.props.totalHorizontalBlocks * this.props.blockWidth + this.props.horizontalIndent }px`
            ,height: `${ this.props.totalVerticalBlocks * this.props.blockHeight + this.props.verticalIndent }px`,
            paddingTop: `${ this.props.verticalIndent }px`,
            paddingLeft: `${ this.props.horizontalIndent }px`,
            top: `calc(50% - ${(this.props.totalVerticalBlocks * this.props.blockHeight + this.props.verticalIndent) / 2 }px)`
        };

        return (
            <div className={ (this.constructor as Function & {name: string}).name } style = { styles }>
                <Cursor
                    { ...this.props }
                    { ...this.props['cursorProps'] }
                />
                { arrOfComponents }
            </div>
        )
    }
}