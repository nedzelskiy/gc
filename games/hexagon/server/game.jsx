'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Faye = require("faye");
var state_1 = require("./state");
var React = require("react");
var ReactDOM = require("react-dom");
var src_1 = require("./components/Board/src");
var Services_1 = require("../../../client/common/Services");
var action_1 = require("./components/Cursor/src/action");
var state = state_1.initState({
    set: function (target, property, value) {
        target[property] = value;
        renderApp();
        return true;
    }
});
var gameSettings = {
    isDebug: true,
    socketClient: new Faye.Client('SERVER_RENDER:protocol:://SERVER_RENDER:domain::SERVER_RENDER:port:SERVER_RENDER:bayeuxCreateClientUrl:', { timeout: 'SERVER_RENDER:timeout:' }),
    blockWidth: 35,
    blockHeight: 35,
    verticalIndent: 2,
    horizontalIndent: 2,
    totalVerticalBlocks: 5,
    totalHorizontalBlocks: 5
};
var renderApp = function () {
    ReactDOM.render(<src_1.Board {...gameSettings} cursorTop={state.Cursor.top} cursorLeft={state.Cursor.left}>Loading...</src_1.Board>, document.querySelector('#game-root'));
};
renderApp();
var moveAction = {
    rightArrow: function () {
        state.Cursor = action_1.moveCursorRight(state.Cursor, gameSettings.blockWidth);
    }
};
if (gameSettings.isDebug) {
    document.getElementsByTagName('body')[0].onkeydown = function (e) {
        var actionName = Services_1.default.mapKeys(e.keyCode);
        moveAction[actionName]();
    };
}
