declare module 'faye' {

    var Faye: {
        NodeAdapter: any;
        getClient(): {
            publish:any
        };
        Client: any;
    };

    export = Faye;
}
