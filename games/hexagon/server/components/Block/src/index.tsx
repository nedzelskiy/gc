'use strict';

import './styles.scss';
import * as React from 'react';

export interface IProps {
    readonly blockWidth: number;
    readonly blockHeight: number;
    readonly id: number | string;
    readonly destiny?: string;
    readonly top?: number;
    readonly left?: number;
}

export class Block extends React.PureComponent<IProps,{}> {
    static defaultProps = {
        destiny: 'empty'
    };
    static propTypes = {
        blockWidth: React.PropTypes.number.isRequired,
        blockHeight: React.PropTypes.number.isRequired,
        destiny: React.PropTypes.string.isRequired,
        id: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]).isRequired,
        top: React.PropTypes.number,
        left: React.PropTypes.number
    };

    render() {
        let {
            destiny,
            top,
            left,
            blockWidth,
            blockHeight
        } = this.props;

        let styles: React.CSSProperties = {
            width: `${ blockWidth }px`,
            height: `${ blockHeight }px`
        };
        ('undefined' !== typeof top) && (styles['top'] = `${ top }px`);
        ('undefined' !== typeof left) && (styles['left'] = `${ left }px`);

        return (
            <div
                data-id = { this.props.id }
                className = { `${(this.constructor as Function & {name: string}).name } block-${ destiny }` }
                style = { styles }
            ></div>
        )
    }
}