var React = require('react')
    , _ = require('lodash')
    , Reflux = require('reflux')
    , Bootstrap = require('react-bootstrap')
    , ContentPage = require('../content-page.jsx')
    ;

var ProjectStore = require('../../stores/project-store.js')
    ;
var ProjectActions = require('../../actions/project-actions.js')
    ;

var ProjectDashboard = React.createClass({
    displayName: 'ProjectDashboard',
    mixins: [
        Reflux.ListenerMixin
    ],

    getInitialState: function () {
        //console.log('getInitialState()');
        return {
            project: ProjectStore.getProject()
        };
    },

    _onProjectChange: function (project) {
        //console.log('onProjectChange()');
        this.setState({
            project: project
        });
    },

    render: function () {
        //console.log('ProjectDashboard.render()');
        var project = this.state.project || {};

        return (
            <ContentPage title='Project Dashboard'
                         subTitle={project.name}
                         icon='gi gi-globe'>
            </ContentPage>
        );
    },

    componentDidMount: function () {
        //console.log('ProjectDashboard.componentDidMount()');
        this.listenTo(ProjectStore, this._onProjectChange);
    }
});

module.exports = ProjectDashboard;