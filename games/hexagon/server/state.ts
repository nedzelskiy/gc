'use strict';

if(!(window as any)['Proxy']) {
    require("core-js/shim");
    require("es2015-proxy-shim");
}


interface IAppState {
    [componentName: string]: any
}

// dynamic load all states from components
let req = require.context('./components/', true, /state\.tsx?$/);
let appState: IAppState = {};
req.keys().forEach((v) => {
    let state: any = (req(v) as {'default': {}})['default'];
    let stateName : string = v.split('/')[1];
    appState[stateName] = state;
});

export const initState = (handler: {}): {} => {
    return new Proxy(appState, handler);
};


