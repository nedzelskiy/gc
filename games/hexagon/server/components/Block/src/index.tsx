'use strict';

import './styles.scss';
import * as React from 'react';
import { Figure } from '../../Figure/src';
import { IState } from '../../Figure/src/state';

export interface IProps {
    readonly blockWidth: number;
    readonly blockHeight: number;
    readonly id: number | string;
    readonly destiny?: string;
    readonly figureProps: IState;
}

export class Block extends React.PureComponent<any,{}> {
    static defaultProps = {
        destiny: 'empty'
    };
    static propTypes = {
        blockWidth: React.PropTypes.number.isRequired,
        blockHeight: React.PropTypes.number.isRequired,
        destiny: React.PropTypes.string.isRequired,
        id: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]).isRequired,
    };

    blockClickHandler = (e: React.SyntheticEvent<HTMLElement>) => {
        this.props.makeBlockVisible(this.props.id);
    };

    render() {
        let {
            destiny,
            blockWidth,
            blockHeight
        } = this.props;

        let styles: React.CSSProperties = {
            width: `${ blockWidth }px`,
            height: `${ blockHeight }px`
        };

        return (
            <div
                data-id = { this.props.id }
                className = { `${(this.constructor as Function & {name: string}).name } block-${ destiny }` }
                onClick = { this.blockClickHandler }
                style = { styles }
            ><Figure id = { `${this.props.id}` } { ...this.props['figureProps'] } /></div>
        )
    }
}