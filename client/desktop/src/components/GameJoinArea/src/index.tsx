'use strict';

import './styles.scss';
import * as React from 'react';
import { elementsVisible } from '../../Root/src';
import { Ii18n, IServices } from '../../Root/src';
import { QrCode, IProps as IQrCodeProps } from '../../QrCode/src';
import { ProgressPlayersJoin, IProps as IProgressPlayersJoinProps } from '../../ProgressPlayersJoin/src';

type IProps = {
    readonly visGameJoinArea: elementsVisible;
} & IQrCodeProps & Ii18n & IServices & IProgressPlayersJoinProps;

export class GameJoinArea extends React.PureComponent<IProps, null> {
    render() {
        let S = this.props.services
            ;
        return (
            <div
                className = { this.constructor.name }
                style = {{'display' : this.props.visGameJoinArea === elementsVisible.Visible ? 'block' : 'none' }}
            >
                <QrCode {...this.props} />
                <ProgressPlayersJoin {...this.props} />
            </div>
        )
    }
}
