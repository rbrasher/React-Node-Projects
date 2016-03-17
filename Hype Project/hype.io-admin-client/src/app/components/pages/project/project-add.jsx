var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Router = require('react-router'),
    ContentPage = require('../content-page.jsx'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Input = require('../../core/horizontal-input.jsx'),
    Form = require('../../core/horizontal-form.jsx'),
    ProjectActions = require('../../actions/project-actions');

var ProjectAdd = React.createClass({
    displayName: 'ProjectAdd',
    mixins: [
        React.addons.LinkedStateMixin,
        Router.Navigation
    ],

    getInitialState: function () {
        return {
            name: '',
            description: ''
        };
    },

    _addProject: function () {
        ProjectActions.addProject(this.state, {
            success: function (newProject) {
                this.context.router.transitionTo('project-dashboard', {projectId: newProject.id});
            }.bind(this)
        });
        this._reset();
    },

    _reset: function () {
        this.replaceState(this.getInitialState());
    },

    render: function () {
        return (
            <ContentPage title='Add a New Project'
                         subTitle='New Project Details'
                         icon='gi gi-plus'>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={this._addProject}
                              onReset={this._reset}
                              submitText='Add This Project'
                              submitIcon='plus'>
                            <Input type='text'
                                   label='Name'
                                   placeholder='Enter the new project name'
                                   help='Your new project name must be unique across all your projects.'
                                   valueLink={this.linkState('name')}/>
                            {/* <Input type='text' label='Icon' placeholder='Enter the icon URL' valueLink={this.linkState('icon')} /> */}
                            <Input type='textarea'
                                   label='Description'
                                   valueLink={this.linkState('description')}/>
                        </Form>
                    </Col>
                </Row>
            </ContentPage>
        );
    }
});

module.exports = ProjectAdd;