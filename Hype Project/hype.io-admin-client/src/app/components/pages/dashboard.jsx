var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    Link = Router.Link,
    Bootstrap = require('react-bootstrap'),
    RouterBootstrap = require('react-router-bootstrap'),
    ButtonLink = RouterBootstrap.ButtonLink,
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    ContentPage = require('./content-page.jsx'),
    Fonticon = require('../core/fonticon.jsx'),
    ProjectsStore = require('../stores/projects-store');

var Dashboard = React.createClass({
    displayName: 'Dashboard',
    mixins: [
        Reflux.connect(ProjectsStore, 'projects')
    ],

    getInitialState: function () {
        return {
            projects: ProjectsStore.getProjects()
        };
    },

    _renderProject: function (project) {
        return (
            <Col sm={6} lg={3} key={project.name}>
                <div className="widget">
                    <div className="widget-simple">
                        <img src={project.icon || 'images/default-icon.png'} alt="Project icon" className="widget-image pull-left" />
                        <h4 className="widget-content">
                            <Link to='project-dashboard' params={{projectId: project.id}}>
                                <strong>{project.name}</strong>
                            </Link>
                            <small>{project.description}</small>
                        </h4>
                    </div>
                    {/*<div className="widget-extra">
                        <Row className='text-center themed-background-dark'>
                            <Col xs={4}>
                                <h3 className="widget-content-light">
                                    <Fonticon library='fa' icon='heart' />
                                    <br />
                                    <small>3.200</small>
                                </h3>
                            </Col>
                            <Col xs={4}>
                                <h3 className="widget-content-light">
                                    <Fonticon icon='group' />
                                    <br />
                                    <small>2.500</small>
                                </h3>
                            </Col>
                            <Col xs={4}>
                                <h3 className="widget-content-light">
                                    <Fonticon icon='eye_open' />
                                    <br />
                                    <small>580</small>
                                </h3>
                            </Col>
                        </Row>
                    </div>*/}
                </div>

            </Col>
        );
    },

    _renderAddProject: function () {
        return (
            <Col sm={6} lg={3} key='~~add project~~'>
                <div className="widget">
                    <div className="widget-simple">
                        <img src='images/default-icon.png' alt="New Project" className="widget-image pull-left" />
                        <h4 className="widget-content">
                            <Link to='project-add'>
                                <strong>New Project</strong>
                            </Link>
                            <small>Create a new project.</small>
                        </h4>
                    </div>
                </div>

            </Col>
        );
    },

    render: function () {
        var items = [],
            projects = this.state.projects,
            self = this;

        projects.map(function (project) {
            items.push(self._renderProject(project));
        });

        return (
            <ContentPage title='Publisher Dashboard' subTitle='All your project are belong to us' icon='gi gi-book'>
                <Row>
                    {items}
                    {this._renderAddProject()}
                </Row>
            </ContentPage>
        );
    }
});

module.exports = Dashboard;