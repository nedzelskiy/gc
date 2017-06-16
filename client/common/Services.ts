'use strict';

class Services {
    // upper first char
    public static uFC(string: string): string {
        if (!string || '' === string) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // upper first char every words in string
    public static uFCEW(string: string): string {
        return string;
    };


    public static addScriptFile(url: string): Promise<never> {
        let head = document.getElementsByTagName('head')[0]
            ,script: any = document.createElement('script')
            ;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = url;

        return new (window as any).Promise((resolve : () => void, reject: () => void) => {
            if (script.readyState){ // IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                        script.onreadystatechange = null;
                        resolve();
                    }
                    reject();
                };
            } else {  //Others
                script.onload = function(){
                    resolve();
                };
            }
            head.appendChild(script);
        });
    };
}

export default Services;