'use strict';

import './styles.scss';
import * as React from 'react';
import { Ii18n, IServices } from '../../Root/src'

export interface IProps {
    readonly srcQrCode: string;
    readonly gameId: string;
    readonly generateNewQrHandler: React.EventHandler<React.SyntheticEvent<HTMLElement>>;
    readonly backToGamesListHandler: React.EventHandler<React.SyntheticEvent<HTMLElement>>;
}

export class QrCode extends React.PureComponent<Ii18n & IServices & IProps, null> {
    static propTypes = {
        srcQrCode: React.PropTypes.string.isRequired,
        gameId: React.PropTypes.string.isRequired,
        generateNewQrHandler: React.PropTypes.func.isRequired
    };

    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ;
        return (
            <div className = { this.constructor.name } >
                <p>{S.uFC(t('please')) + ', ' + t('scan this qr-code on Game Center application from your mobile device')}</p>
                <img ref = "qrImage" name = "qrImage" src = {this.props.srcQrCode} alt = "" />
                <button type="button"
                        className="btn btn-outline-primary generate-new-qr"
                        onClick = { this.props.generateNewQrHandler.bind(this, this.props.gameId) }
                        href="#"
                        role="button">{ t('generate new qr-code') }
                </button>
                <button type="button"
                        className="btn btn-outline-primary back-to-game-list"
                        onClick = {this.props.backToGamesListHandler.bind(this) }
                        href="#"
                        role="button">{ t('back to game list') }
                </button>
            </div>
        )
    }
}