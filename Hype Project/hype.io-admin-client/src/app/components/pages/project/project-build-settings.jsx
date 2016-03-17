var React = require('react')
    , Reflux = require('reflux')
    , Bootstrap = require('react-bootstrap')
    , Modal = Bootstrap.Modal
    , Panel = Bootstrap.Panel
    , Alert = Bootstrap.Alert
    , Grid = Bootstrap.Grid
    , Row = Bootstrap.Row
    , Col = Bootstrap.Col
    , Input = Bootstrap.Input
    , Button = Bootstrap.Button

    , DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin')

    , ContentPage = require('../content-page.jsx')
    ;

var BuildStore = require('../../stores/build-store.js')
    ;

var ProjectActions = require('../../actions/project-actions')
    ;

var ProjectAppBuilder = React.createClass({
    displayName: 'ProjectBuildSettings',
    mixins: [
        Reflux.ListenerMixin,
        DeepLinkedStateMixin
    ],

    _onBuildChanged: function (builds) {
        //console.log("_onBuildChanged: " + builds);
        this.setState({
            isBusy: false,
            error: null,
            builds: builds
        });
    },

    _onEditBuildCompleted: function () {
        this.setState({
            error: null
        });
    },
    _onEditBuildFailed: function (error) {
        this.setState({
            error: error
        });
    },
    _onEditBuildAlways: function () {
        this.setState({
            isBusy: false
        })
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
        ProjectActions.editBuild('android', this.state.builds.android);
        ProjectActions.editBuild('ios', this.state.builds.ios);
    },

    _editBuildSettings: function () {
        this.setState({
            editor: true
        });
    },

    _hasError: function () {
        return !!(this.state.error);
    },

    _handleErrorDismiss: function () {
        this.setState({
            error: null
        });
    },

    getInitialState: function () {
        //console.log("getInitialState");
        return {
            isBusy: !BuildStore.isLoaded(),
            error: null,
            editor: false,
            builds: BuildStore.getBuilds()
        }
    },

    componentDidMount: function () {
        //console.log("componentDidMount");
        this.listenTo(BuildStore, this._onBuildChanged);

        //this.listenTo(ProjectActions.refreshBuilds.completed, this._onRefreshBuildsCompleted);
        //this.listenTo(ProjectActions.refreshBuilds.failed, this._onRefreshBuildsFailed);
        //this.listenTo(ProjectActions.refreshBuilds.always, this._onRefreshBuildsAlways);
        //

        this.listenTo(ProjectActions.editBuild.completed, this._onEditBuildCompleted);
        this.listenTo(ProjectActions.editBuild.failed, this._onEditBuildFailed);
        this.listenTo(ProjectActions.editBuild.always, this._onEditBuildAlways);
    },

    //_onRefreshBuildsCompleted: function () {
    //    this.setState({
    //        error: null,
    //        builds: BuildStore.getBuilds(this.state.projectId)
    //    })
    //},
    //_onRefreshBuildsFailed: function (error) {
    //    this.setState({error: error});
    //},
    //_onRefreshBuildsAlways: function () {
    //    this.setState({
    //        isBusy: false
    //    })
    //},

    renderBusy: function () {
        if (!this.state.isBusy) {
            return <span />;
        }

        return (
            <div className="busy">
                <div className="busy-container">
                    <i className="fa fa-spinner fa-3x fa-spin"></i>
                </div>
            </div>
        )
    },

    renderErrorPanel: function () {
        var errorShow = {
            display: this._hasError() ? 'block' : 'none'
        };

        return (
            <div style={errorShow}>
                <Alert bsStyle='danger' onDismiss={this._handleErrorDismiss}>
                    <h4>Has Errors:</h4>

                    <p>{JSON.stringify(this.state.error)}</p>
                </Alert>
            </div>
        );
    },

    renderOverlay: function () {
        if (!this.state.editor) {
            return;
        }

        return (
            <Modal bsStyle='primary' title="Project Build Settings" onRequestHide={this._handleEditorCancel}>
                <div className='modal-body'>
                    <div className='form-horizontal'>
                        <Panel header="Android" bsStyle="primary">
                            <Input type='text' placeholder='' label='Application Identifier' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.ios.appIdentifier')}/>
                            <Input type='text' placeholder='' label='Developer Certificate' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.ios.signingCertificateUrl')}/>
                            <Input type='text' placeholder='' label='Certificate Password' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.ios.certificatePassword')}/>
                        </Panel>
                        <Panel header="iOS" bsStyle="primary">
                            <Input type='text' placeholder='' label='Package Name' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.android.appIdentifier')}/>
                            <Input type='text' placeholder='' label='Signing Keystore' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.android.signingCertificateUrl')}/>
                            <Input type='text' placeholder='' label='Keystore Password' ref='text'
                                   labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                                   valueLink={this.linkState('builds.android.certificatePassword')}/>
                        </Panel>
                    </div>
                </div>
                <div className='modal-footer'>
                    <Button onClick={this._handleEditorSubmit}>Submit</Button>
                </div>
            </Modal>
        )
    },

    render: function () {
        return (
            <ContentPage title='Project Build Settings' subTitle='Modify your project build settings here.'
                         icon='gi gi-settings'>
                <div>
                    {this.renderErrorPanel()}
                    <Panel header="Android" bsStyle="primary">
                        <Grid>
                            <Row>
                                <Col xs={4} md={2}>Package Name</Col>
                                <Col xs={14} md={10}>{this.state.builds.android.appIdentifier}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={2}>Signing Keystore</Col>
                                <Col xs={14} md={10}>{this.state.builds.android.signingCertificateUrl}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={2}>Keystore Password</Col>
                                <Col xs={14} md={10}>{this.state.builds.android.certificatePassword}</Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel header="iOS" bsStyle="primary">
                        <Grid>
                            <Row>
                                <Col xs={4} md={2}>Application Identifier</Col>
                                <Col xs={14} md={10}>{this.state.builds.ios.appIdentifier}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={2}>Developer Certificate</Col>
                                <Col xs={14} md={10}>{this.state.builds.ios.signingCertificateUrl}</Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={2}>Certificate Password</Col>
                                <Col xs={14} md={10}>{this.state.builds.ios.certificatePassword}</Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Button bsStyle="primary" onClick={this._editBuildSettings}>
                        Edit Build Settings
                    </Button>
                    {this.renderOverlay()}
                    {this.renderBusy()}
                </div>
            </ContentPage>
        )
    }
});

module.exports = ProjectAppBuilder;