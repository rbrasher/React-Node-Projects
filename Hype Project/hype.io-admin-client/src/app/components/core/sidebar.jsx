var React = require('react')
    , _ = require('lodash')
    , Router = require('react-router')
    , Reflux = require('reflux')
    , SidebarProfile = require('./sidebar-profile.jsx')
    , SidebarItem = require('./sidebar-item.jsx')
    , ActivitySummary = require('./activity-summary.jsx')
    ;

var ProjectsStore = require('../stores/projects-store')
    ;

var Sidebar = React.createClass({
    displayName: 'Sidebar',
    propTypes: {
        items: React.PropTypes.array
    },
    mixins: [
        Router.Navigation,
        Reflux.connect(ProjectsStore, 'projects')
    ],

    getInitialState: function () {
        //console.log("getInitialState");
        return {
            projects: ProjectsStore.getProjects()
        };
    },

    _getItems: function() {
        //console.log("_getItems");
        var currentRoutes = this.context.router.getCurrentRoutes();
        var idIndex = _.findIndex(currentRoutes, function(route) {
            return route.name == 'project-id';
        });
        var route = idIndex > 0 ? currentRoutes[currentRoutes.length-1].name : 'project-dashboard';

        var items = [],
            projects = this.state.projects;

        this.props.items.map(function(item, idx) {
            items.push(<SidebarItem key={item.text} index={idx} type={item.type} route={item.route} iconClassName={item.iconClassName}>{item.text}</SidebarItem>);

            if (item.text == 'Projects') {
                projects.map(function(project, pidx) {
                    items.push(<SidebarItem key={project.name} index={pidx} type={SidebarItem.Types.LINK} route={route} params={{projectId: project.id}} iconClassName='gi gi-book'>{project.name}</SidebarItem>);
                });
            }
        });

        return items;
    },

    render: function () {
        return (
            <div id="sidebar">
                <div id="sidebar-scroll">
                    <div className="sidebar-content">
                        <a href="index.html" className="sidebar-brand">
                            <i className="gi gi-fire"></i>
                            <span className="sidebar-nav-mini-hide">
                                <strong>Hype</strong>
                                .io</span>
                        </a>

                        <SidebarProfile />

                        <ul className="sidebar-nav">
                        {this._getItems()}
                        </ul>

                        <ActivitySummary items={[]} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;