'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var React = require("react");
var src_1 = require("../../Block/src");
var Cursor = (function (_super) {
    __extends(Cursor, _super);
    function Cursor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // getNextHorizontalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), this.props.blockWidth + Settings.blockBorderShift)};
    // getPreviousHorizontalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), -(this.props.blockWidth - Settings.blockBorderShift))};
    // getNextVerticalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), null, this.props.blockHeight + Settings.blockBorderShift)};
    // getPreviousVerticalNode = () => {return Services.getNodeUnderNodeTop(Elements.get('cursor'), null, -(this.props.blockHeight - Settings.blockBorderShift))};
    // rightAction = () => {
    //     if (Services.getJqueryNode($, this.getNextHorizontalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.left + 1;
    //         this.updateHorizontalPosition({left: newPosition});
    //     }
    // };
    //
    // leftAction = () => {
    //     if (Services.getJqueryNode($, this.getPreviousHorizontalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.left - 1;
    //         this.updateHorizontalPosition({left: newPosition});
    //     }
    // };
    //
    // upAction = () => {
    //     if (Services.getJqueryNode($, this.getPreviousVerticalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.top - 1;
    //         this.updateVerticalPosition({top: newPosition});
    //     }
    // };
    //
    // downAction = () => {
    //     if (Services.getJqueryNode($, this.getNextVerticalNode()).hasClass('block')) {
    //         let newPosition = this.state.position.top + 1;
    //         this.updateVerticalPosition({top: newPosition});
    //     }
    // };
    //
    // selectAction = () => {
    //     if (Elements.get('cursor').hasClass('select-mode')) {
    //         Elements.get('cursor').removeClass('select-mode');
    //     } else {
    //         Elements.get('cursor').addClass('select-mode');
    //     }
    // };
    //
    // updateVerticalPosition = (position) => {
    //     position.left = this.state.position.left;
    //     this.setState({position : position});
    // };
    //
    // updateHorizontalPosition = (position) => {
    //     position.top = this.state.position.top;
    //     this.setState({position : position});
    // };
    Cursor.prototype.render = function () {
        var props = __rest(this.props, []);
        return (<src_1.Block {...props}/>);
    };
    return Cursor;
}(React.PureComponent));
Cursor.defaultProps = {
    destiny: 'cursor'
};
Cursor.propTypes = {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired
};
exports.Cursor = Cursor;
