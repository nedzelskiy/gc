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

        return new (window as Window & { Promise:any }).Promise((resolve : () => void, reject: () => void) => {
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

    public static fadeOut(el: HTMLElement, callback: any = null, time = 100): void {
        el.style.opacity = '1';

        let _time_: number = time/10 || 50;
        (function fade() {
            let val: number = parseFloat(el.style.opacity);
            if (val <= 0) {
                el.style.display = "none";
                if (callback && (typeof callback === 'function')){
                    callback();
                }
            } else {
                setTimeout(function(){
                    val = val - 0.1;
                    el.style.opacity = '' + val;
                    fade();
                }, _time_);
            }
        })();
    };

    public static fadeIn(el: HTMLElement, callback: any = null, time = 100, display = 'block') : void {
        el.style.opacity = '0';
        el.style.display = display;

        let _time_: number = time/10 || 50;

        (function fade() {
            let val: number = parseFloat(el.style.opacity);
            if (val < 1) {
                setTimeout(function(){
                    val = val + 0.1;
                    el.style.opacity = '' + val;
                    fade();
                },_time_);
            } else {
                el.style.opacity = '1';
                if (callback && (typeof callback === 'function')){
                    callback();
                }
            }
        })();
    };

    public static mapKeys(keyCode: number) {
        switch (keyCode) {
            case 13:
                return 'enterKey';
            case 37:
                return 'leftArrow';
            case 38:
                return 'upArrow';
            case 40:
                return 'downArrow';
            case 39:
                return 'rightArrow';
            default:
                return String.fromCharCode(keyCode);
        }
    };
}

export default Services;