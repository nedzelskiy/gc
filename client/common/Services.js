'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Services = (function () {
    function Services() {
    }
    // upper first char
    Services.uFC = function (string) {
        if (!string || '' === string) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    ;
    // upper first char every words in string
    Services.uFCEW = function (string) {
        return string;
    };
    ;
    Services.addScriptFile = function (url) {
        var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = url;
        return new window.Promise(function (resolve, reject) {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        resolve();
                    }
                    reject();
                };
            }
            else {
                script.onload = function () {
                    resolve();
                };
            }
            head.appendChild(script);
        });
    };
    ;
    Services.fadeOut = function (el, callback, time) {
        if (callback === void 0) { callback = null; }
        if (time === void 0) { time = 100; }
        el.style.opacity = '1';
        var _time_ = time / 10 || 50;
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (val <= 0) {
                el.style.display = "none";
                if (callback && (typeof callback === 'function')) {
                    callback();
                }
            }
            else {
                setTimeout(function () {
                    val = val - 0.1;
                    el.style.opacity = '' + val;
                    fade();
                }, _time_);
            }
        })();
    };
    ;
    Services.fadeIn = function (el, callback, time, display) {
        if (callback === void 0) { callback = null; }
        if (time === void 0) { time = 100; }
        if (display === void 0) { display = 'block'; }
        el.style.opacity = '0';
        el.style.display = display;
        var _time_ = time / 10 || 50;
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (val < 1) {
                setTimeout(function () {
                    val = val + 0.1;
                    el.style.opacity = '' + val;
                    fade();
                }, _time_);
            }
            else {
                el.style.opacity = '1';
                if (callback && (typeof callback === 'function')) {
                    callback();
                }
            }
        })();
    };
    ;
    Services.mapKeys = function (keyCode) {
        switch (keyCode) {
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
    ;
    return Services;
}());
exports.default = Services;
