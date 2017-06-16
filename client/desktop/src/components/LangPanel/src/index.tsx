'use strict';

import './styles.scss';
import * as React from 'react';

interface IProps {
    readonly langs: Array<ILangObj>;
    readonly langHandler: (lang: string) => void;
}

export interface ILangObj {
    readonly code: string;
    readonly name: string;
}

export class LangPanel extends React.PureComponent<IProps, null> {
    static propTypes = {
        langs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        langHandler: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <div className = { this.constructor.name }>
                {
                    this.props.langs.map((langObj: ILangObj, index: number): JSX.Element => {
                        return <button
                                    key = { index }
                                    onClick= { this.props.langHandler.bind(null, langObj.code) }
                                >
                                    { langObj.name }
                                </button>
                    })
                }
            </div>
        )
    }
}