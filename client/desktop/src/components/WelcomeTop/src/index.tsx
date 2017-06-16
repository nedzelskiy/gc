'use strict';

import './styles.scss';
import * as React from 'react';
import { Ii18n, IServices } from '../../Root/src'


export class WelcomeTop extends React.PureComponent<IServices & Ii18n, null> {
    render() {
        let S = this.props.services
            ,t = this.props.translatior
            ;
        return (
            <div className = { `${this.constructor.name} jumbotron` }>
                <div className="container">
                     <h1 className="mb-4">{S.uFC(t('hello, on game center online')) + '!'}</h1>
                     <p className="mb-0">
                         {S.uFC(t('play multiplayers games online with your mobile phones')) + '!'}
                         {S.uFC(t('see'))} <a className="underline-dashed">{S.uFC(t('about'))}</a> {t('for more information') + '!'}!
                     </p>
                     <p>
                         {S.uFC(t('for start')) + ', ' + t('please') + ', ' + t('choose the game from list below') + '!'}
                     </p>
                     <p>
                         <a className="btn btn-primary btn-lg" href="#" role="button">{S.uFC(t("let's start")) + '!'}
                         </a>
                         <span className="margin-x-">{t('or go to the')}</span>
                         <a className="underline-dashed">{S.uFCEW(t('personal area'))}</a>
                     </p>
                 </div>
            </div>
        )
    }
}