'use strict';

import './styles.scss';
import * as React from 'react';
import { Block, IProps as IBlockProps } from '../../Block/src';

type IProps = IBlockProps;

export class Cursor extends React.PureComponent<IProps,{}> {
    static defaultProps = {
        destiny: 'cursor',
        top: 0,
        left: 0
    };

    handleCursorAction = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
        let methodName: string = `${data.action}Action`;
        // if (typeof this[methodName] !== 'undefined' ) {
        //     this[methodName]();
        // }
    };

    // getNextHorizontalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), this.props.blockWidth + Settings.blockBorderShift)};
    // getPreviousHorizontalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), -(this.props.blockWidth - Settings.blockBorderShift))};
    // getNextVerticalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), null, this.props.blockHeight + Settings.blockBorderShift)};
    // getPreviousVerticalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), null, -(this.props.blockHeight - Settings.blockBorderShift))};

    // rightAction = () => {
    //     if (Services.getJqueryNode($, this.getNextHorizontalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.left + 1;
    //         this.updateHorizontalPosition({left: newPosition});
    //     }
    // };
    //
    // leftAction = () => {
    //     if (Services.getJqueryNode($, this.getPreviousHorizontalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.left - 1;
    //         this.updateHorizontalPosition({left: newPosition});
    //     }
    // };
    //
    // upAction = () => {
    //     if (Services.getJqueryNode($, this.getPreviousVerticalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.top - 1;
    //         this.updateVerticalPosition({top: newPosition});
    //     }
    // };
    //
    // downAction = () => {
    //     if (Services.getJqueryNode($, this.getNextVerticalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.top + 1;
    //         this.updateVerticalPosition({top: newPosition});
    //     }
    // };
    //
    // selectAction = () => {
    //     if (Elements.get('cursor').hasClass('select-mode')) {
    //         Elements.get('cursor').removeClass('select-mode');
    //     } else {
    //         Elements.get('cursor').addClass('select-mode');
    //     }
    // };
    //
    // updateVerticalPosition = (position) => {
    //     position.left = this.state.position.left;
    //     this.setState({position : position});
    // };
    //
    // updateHorizontalPosition = (position) => {
    //     position.top = this.state.position.top;
    //     this.setState({position : position});
    // };

    render() {
        let {...props} = this.props;
        return (
            <Block
                {...props}
            />
            // <Block
            //     {...props}
            //     ref = 'handler'
            //     top = {this.state.position.top * {...props}.blockHeight + Settings.blockBorderShift}
            //     left = {this.state.position.left * {...props}.blockWidth + Settings.blockBorderShift}
            // />
        )
    }
}