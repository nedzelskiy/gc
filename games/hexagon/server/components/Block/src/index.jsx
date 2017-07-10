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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.render = function () {
        var _a = this.props, destiny = _a.destiny, top = _a.top, left = _a.left, blockWidth = _a.blockWidth, blockHeight = _a.blockHeight;
        var styles = {
            width: blockWidth + "px",
            height: blockHeight + "px"
        };
        ('undefined' !== typeof top) && (styles['top'] = top + "px");
        ('undefined' !== typeof left) && (styles['left'] = left + "px");
        return (<div data-id={this.props.id} className={this.constructor.name + " block-" + destiny} style={styles}></div>);
    };
    return Block;
}(React.PureComponent));
Block.defaultProps = {
    destiny: 'empty'
};
Block.propTypes = {
    blockWidth: React.PropTypes.number.isRequired,
    blockHeight: React.PropTypes.number.isRequired,
    destiny: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    top: React.PropTypes.number,
    left: React.PropTypes.number
};
exports.Block = Block;
