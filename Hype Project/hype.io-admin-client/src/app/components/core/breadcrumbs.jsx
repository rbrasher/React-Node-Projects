var React = require('react'),
    Router = require('react-router'),
    routeData = require('../../../data/route-breadcrumb-data.js');

var Breadcrumbs = React.createClass({
    displayName: 'Breadcrumbs',

    contextTypes: {
        router: React.PropTypes.func.isRequired,
    },

    _getBreadcrumbs: function () {
        var crumbs = [];

        this.context.router.getCurrentRoutes().map(function (route, idx) {
            var routeDescription = routeData[route.name] || {},
                title = routeDescription.breadcrumb;

            if (title && !(title == '~')) {
                crumbs.push(<li key={route.name}>{title}</li>);
            }
        });

        return crumbs;
    },

    render: function () {
        return (
            <ul className="breadcrumb breadcrumb-top">
        {this._getBreadcrumbs()}
            </ul>
        );
    }
});

module.exports = Breadcrumbs;