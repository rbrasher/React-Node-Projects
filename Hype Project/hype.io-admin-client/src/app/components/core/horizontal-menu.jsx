var React = require('react');

var HorizontalMenu = React.createClass({
    displayName: 'HorizontalMenu',

    render: function () {
        return (
            <div id="horizontal-menu-collapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                {this.props.children}
                </ul>
            </div>
        );
    }
});

module.exports = HorizontalMenu;