'use strict';

import * as React from 'react';
import { Ii18n, IServices } from '../../Root/src'

interface IProps {
    srcQrCode: string;
    generateNewQrHandler: React.EventHandler<React.SyntheticEvent<HTMLElement>>;
}

export class QrCode extends React.PureComponent<Ii18n & IServices & IProps, null> {
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
                        onClick = {this.props.generateNewQrHandler.bind(this)}
                        href="#"
                        role="button">{t('generate new qr-code')}
                </button>
            </div>
        )
    }
}