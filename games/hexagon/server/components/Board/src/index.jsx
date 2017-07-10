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
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var React = require("react");
var src_1 = require("../../Block/src");
var src_2 = require("../../Cursor/src");
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.render = function () {
        var totalBlocks = this.props.totalHorizontalBlocks * this.props.totalVerticalBlocks;
        var arrOfComponents = [];
        while (arrOfComponents.length < totalBlocks) {
            arrOfComponents.push(<src_1.Block key={arrOfComponents.length} id={arrOfComponents.length} blockWidth={this.props.blockWidth} blockHeight={this.props.blockHeight}/>);
        }
        var styles = {
            width: this.props.totalHorizontalBlocks * this.props.blockWidth + this.props.horizontalIndent + "px",
            height: this.props.totalVerticalBlocks * this.props.blockHeight + this.props.verticalIndent + "px",
            paddingTop: this.props.verticalIndent + "px",
            paddingLeft: this.props.horizontalIndent + "px",
        };
        return (<div className={this.constructor.name} style={styles}>
                <src_2.Cursor id='cursor' blockWidth={this.props.blockWidth} blockHeight={this.props.blockHeight} top={this.props.cursorTop} left={this.props.cursorLeft}/>
                {arrOfComponents}
            </div>);
    };
    return Board;
}(React.PureComponent));
Board.propTypes = {
    cursorTop: React.PropTypes.number.isRequired,
    cursorLeft: React.PropTypes.number.isRequired
};
exports.Board = Board;
