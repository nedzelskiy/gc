'use strict';

const initialState: string = '';

export interface IAction {
    readonly type: 'CHANGE_QR_CODE';
    readonly srcQrCode: string;
}

export default (state = initialState, action: IAction) => {
    if (action.type === 'CHANGE_QR_CODE') {
        return action.srcQrCode;
    }
    return state;
};