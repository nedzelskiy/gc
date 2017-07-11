'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
if (!window['Proxy']) {
    require("core-js/shim");
    require("es2015-proxy-shim");
}
// dynamic load all states from components
var req = require.context('./components/', true, /state\.tsx?$/);
var appState = {};
req.keys().forEach(function (v) {
    var state = req(v)['default'];
    var stateName = v.split('/')[1];
    appState[stateName] = state;
});
exports.initState = function (handler) {
    return new Proxy(appState, handler);
};
