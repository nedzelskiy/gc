'use strict';

if(!(window as any)['Proxy']) {
    require("core-js/shim");
    require("es2015-proxy-shim");
}

export interface IAppState {
    [componentName: string]: any
}
export let appState: IAppState = {};
export let appComponents: Array<string> = [];

// dynamic load all states from components
let req = require.context('../components/', true, /state\.tsx?$/);
req.keys().forEach((v) => {
    let state: any = (req(v) as {'default': {}})['default'];
    let stateName : string = v.split('/')[1];
    appComponents.push(stateName);
    appState[stateName] = state;
});

export const initState = (handler: {}): {} => {
    return new Proxy(appState, handler);
};


