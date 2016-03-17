var React = require('react')
    , Reflux = require('reflux')
    , Bootstrap = require('react-bootstrap')
    , Row = Bootstrap.Row
    , Col = Bootstrap.Col
    , Input = Bootstrap.Input
    , Form = require('../../core/horizontal-form.jsx')
    , ContentPage = require('../content-page.jsx')
    , DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin')
    , Alert = Bootstrap.Alert
    ;

var ProfileActions = require('../../actions/profile-actions')
    , ProfileStore = require('../../stores/profile-store')
    ;

var ProfileChangePassword = React.createClass({
    displayName: 'ProfileChangePassword',
    mixins: [
        Reflux.ListenerMixin,
        DeepLinkedStateMixin,
    ],

    getInitialState: function() {
        return {
            busy: !ProfileStore.isLoaded(),
            profile: ProfileStore.getProfile(),
            oldPassword: '',
            newPassword: '',
            alertVisible: false,
            style: '',
            msg: ''
        };
    },

    componentDidMount: function() {
        this.listenTo(ProfileActions.passwordChanged.completed, this._onPasswordChangedCompleted);
        this.listenTo(ProfileActions.passwordChanged.failed, this._onPasswordChangedFailed);
    },

    _onPasswordChangedCompleted: function() {
        var style = 'success';
        var msg = 'User password successfully changed!';
        this.handleAlertShow(style, msg);
    },

    _onPasswordChangedFailed: function(error) {
        var style = 'danger';
        var msg = 'Error changing password: ' + error;
        this.handleAlertShow(style, msg);
    },

    _reset: function() {
        this.replaceState(this.getInitialState());
    },

    _submit: function() {
        var data = {
            email: this.state.profile.email,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };

        ProfileStore._onChangePassword(data);
    },

    handleAlertDismiss: function() {
        this.setState({
            alertVisible: false,
            style: '',
            msg: ''
        });
    },

    handleAlertShow: function(style, message) {
        this.setState({
            alertVisible: true,
            style: style,
            msg: message
        });
    },

    renderAlert: function() {
        if(this.state.alertVisible) {
            return (
                <Alert bsStyle={this.state.style} onDismiss={this.handleAlertDismiss}>
                    <strong>{this.state.msg}</strong>
                </Alert>
            );
        }
    },

    render: function() {
        return (
            <ContentPage title='Change Password' subTitle='' icon='gi gi-user'>
                <Row>
                {this.renderAlert()}
                    <Col md={6}>
                        <Form onSubmit={this._submit} onReset={this._reset} submitText='Change Password'>
                            <Input type='text' label='Email Address' valueLink={this.linkState('profile.email')} readOnly />
                            <Input type='text' label='Old Password' valueLink={this.linkState('oldPassword')} />
                            <Input type='text' label='New Password' valueLink={this.linkState('newPassword')} />
                        </Form>
                    </Col>
                </Row>
            </ContentPage>
        );
    }
});

module.exports = ProfileChangePassword;

