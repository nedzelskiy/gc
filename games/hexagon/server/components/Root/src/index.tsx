'use strict';

import * as React from 'react';
import { Board }from '../../Board/src';


export class Root extends React.PureComponent<any,{}> {
    render() {
        return(
            <Board {...this.props} />
        )
    }
}