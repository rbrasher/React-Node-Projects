var React = require('react')
    , Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    ;

var ProjectActions = require('../actions/project-actions')
    ;

var ProjectHome = React.createClass({
    displayName: "ProjectHome",
    mixins: [
        Router.Navigation
    ],

    _setProjectId: function(projectId) {
        ProjectActions.setActiveProject(projectId);
    },

    //getInitialState: function () {
    //    console.log("getInitialState");
    //
    //    return {
    //        projectId: projectId
    //    };
    //},

    componentWillReceiveProps: function () {
        //console.log("componentWillReceiveProps");
        this._setProjectId(this.context.router.getCurrentParams().projectId);
    },

    componentDidMount: function () {
        //console.log("componentDidMount");
        this._setProjectId(this.context.router.getCurrentParams().projectId);
    },

    render: function () {
        return (
            <RouteHandler />
        );
    }
});

module.exports = ProjectHome;