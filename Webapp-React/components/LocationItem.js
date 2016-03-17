/**
 * Created by ron on 4/24/2015.
 */
var React = require('react'),
    moment = require('moment');

var LocationItem = React.createClass({

    handleClick: function() {
        this.props.onClick(this.props.address);
    },

    render: function() {
        var cn = "list-group-item";

        if(this.props.active) {
            cn += " active-location";
        }

        return (
            <a className={cn} onClick={this.handleClick}>
                {this.props.address}
                <span className="createdAt">{moment(this.props.timestamp).fromNow()}</span>
                <span className="glyphicon glyphicon-menu-right"></span>
            </a>
        );
    }
});

module.exports = LocationItem;