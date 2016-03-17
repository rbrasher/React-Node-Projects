var React = require('react')
    , Reflux = require('reflux')
    , Bootstrap = require('react-bootstrap')
    , Modal = Bootstrap.Modal
    , Grid = Bootstrap.Grid
    , Row = Bootstrap.Row
    , Col = Bootstrap.Col
    , Input = Bootstrap.Input
    , Button = Bootstrap.Button
    , Alert = Bootstrap.Alert

    , DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin')

    , ContentPage = require('../content-page.jsx')
    ;

var ProjectStore = require('../../stores/project-store.js')
    ;

var ProjectActions = require('../../actions/project-actions')
    ;

var ProjectSettings = React.createClass({
    displayName: 'ProjectSettings',
    mixins: [
        Reflux.ListenerMixin,
        DeepLinkedStateMixin
    ],

    _onProjectChanged: function (project) {
        this.setState({
            project: project
        })
    },

    getInitialState: function () {
        //console.log("getInitialState");
        return {
            isBusy: !ProjectStore.isLoaded(),
            error: null,
            editor: false,
            project: ProjectStore.getProject(),
            alertVisible: false
        }
    },

    componentDidMount: function () {
        //console.log("componentDidMount");
        this.listenTo(ProjectStore, this._onProjectChanged);
    },

    _deleteProject: function (e) {
        if (e) {
            e.preventDefault();
        }

        ProjectActions.deleteProject(this.state.project.id, {
            success: function () {
                this.context.router.transitionTo('root');
            }.bind(this)
        });
    },

    _handleEditorCancel: function () {
        this.setState({
            editor: false
        });
    },

    _handleEditorSubmit: function () {
        this.setState({
            editor: false,
            isBusy: true,
            error: null
        });
        ProjectActions.editProject(this.state.project);
    },

    _editProjectSettings: function () {
        this.setState({
            editor: true
        });
    },

    _handleAlertDismiss: function() {
        this.setState({alertVisible: false});
    },

    _handleAlertShow: function() {
        this.setState({alertVisible: true});
    },

    renderAlert: function() {
        if(this.state.alertVisible) {
            return (
                <Alert bsStyle='warning' onDismiss={this._handleAlertDismiss} dismissAfter={10000}>
                    <h4>Delete this Project&#63;</h4>
                    <p>Are you sure you want to delete this Project&#63;</p>
                    <p>
                        <Button bsStyle='danger' onClick={this._deleteProject}>Yes, delete it.</Button>
                        <span> or </span>
                        <Button onClick={this._handleAlertDismiss}>No thanks.</Button>
                    </p>
                </Alert>
            );
        }
    },

    renderOverlay: function () {
        if (!this.state.editor) {
            return;
        }

        return (
            <Modal bsStyle="primary" title="Project Settings" onRequestHide={this._handleEditorCancel}>
                <div className='modal-body'>
                    <div className='form-horizontal'>
                        <Input type='text' placeholder='' label='Project Name' ref='text'
                               labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                               valueLink={this.linkState('project.name')}/>
                        <Input type='text' placeholder='' label='Project Description' ref='text'
                               labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                               valueLink={this.linkState('project.description')}/>
                    </div>
                </div>
                <div className='modal-footer'>
                    <Button bsStyle="primary" onClick={this._handleEditorSubmit}>Submit</Button>
                </div>
            </Modal>
        )
    },

    render: function () {
        return (
            <ContentPage title='Project Settings' subTitle='Modify your project settings here.' icon='gi gi-settings'>
                {this.renderAlert()}
                <div>
                    <Grid style={{'margin-bottom': '20px'}}>
                        <Row>
                            <Col xs={4} md={2}>Project Name</Col>
                            <Col xs={14} md={10}>{this.state.project.name}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={2}>Project Description</Col>
                            <Col xs={14} md={10}>{this.state.project.description}</Col>
                        </Row>
                    </Grid>

                    <Button bsStyle="primary" style={{'margin-right': '20px'}} onClick={this._editProjectSettings}>
                        Edit Project Settings
                    </Button>

                    <Button bsStyle="danger" onClick={this._handleAlertShow}>
                        Delete Project
                    </Button>

                    {this.renderOverlay()}
                </div>
            </ContentPage>
        );
    }
});

module.exports = ProjectSettings;