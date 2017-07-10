'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCursorRight = function (state, blockWidth) {
    var newState = __assign({}, state);
    var newPosition = newState.left + blockWidth;
    newState.left = newPosition;
    return newState;
};
