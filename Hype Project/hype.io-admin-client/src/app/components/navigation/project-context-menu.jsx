var React = require('react'),
    Router = require('react-router'),
    Bootstrap = require('react-router-bootstrap'),
    MenuItem = Bootstrap.NavItemLink,
    Menu = require('../core/horizontal-menu.jsx');

var ProjectContextMenu = React.createClass({
    displayName: 'ProjectContextMenu',

    contextTypes: {
        router: React.PropTypes.func.isRequired,
    },

    render: function () {
        var project = this.context.router.getCurrentParams().projectId,
            params = {
                projectId: project
            };

        if (!project) {
            return null;
        }

        return (
            <Menu>
                <MenuItem to='project-dashboard' params={params}>Project Home</MenuItem>
                <MenuItem to='project-pages' params={params}>Pages</MenuItem>
                <MenuItem to='project-settings' params={params}>Project Settings</MenuItem>
                <MenuItem to='project-build-settings' params={params}>Build Settings</MenuItem>
                {/*<MenuItem to='project-users' params={params}>Users</MenuItem>
                <MenuItem to='project-notifications' params={params}>Notifications</MenuItem>*/}
            </Menu>
        );
    }
});

module.exports = ProjectContextMenu;