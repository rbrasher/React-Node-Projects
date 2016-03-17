var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

var Types = {
    LINK: 'LINK',
    HEADER: 'HEADER',
    NESTED: 'NESTED'
};

var SidebarItem = React.createClass({
    displayName: 'SidebarItem',
    statics: {
        Types: Types
    },
    propTypes: {
        index: React.PropTypes.number.isRequired,
        type: React.PropTypes.string,
        route: React.PropTypes.string,
        params: React.PropTypes.object,
        iconClassName: React.PropTypes.string,
        onTouchTap: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        selected: React.PropTypes.bool
    },

    getInitialState: function () {
        return {};
    },

    _getHeader: function () {
        return (
            <li className="sidebar-header">
                <span className="sidebar-header-title">{this.props.children}</span>
            </li>
        );
    },

    _getLink: function () {
        var cls = this.props.iconClassName + ' sidebar-nav-icon';

        return (
            <li>
                <Link to={this.props.route} params={this.props.params}>
                    <i className={cls}></i>
                    <span className="sidebar-nav-mini-hide">{this.props.children}</span>
                </Link>
            </li>
        );
    },

    render: function () {
        switch (this.props.type) {
            case Types.HEADER:
                return this._getHeader();
                break;
            default:
                return this._getLink();
                break;
        }
    }
});

module.exports = SidebarItem;