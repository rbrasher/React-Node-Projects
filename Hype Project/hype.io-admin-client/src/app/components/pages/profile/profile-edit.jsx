var React = require('react')
    , Reflux = require('reflux')
    , Bootstrap = require('react-bootstrap')
    , Row = Bootstrap.Row
    , Col = Bootstrap.Col
    , Panel = Bootstrap.Panel
    , Input = Bootstrap.Input
    , Form = require('../../core/horizontal-form.jsx')
    , ContentPage = require('../content-page.jsx')
    , DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin')
    ;

var ProfileActions = require('../../actions/profile-actions')
    ;

var ProfileStore = require('../../stores/profile-store')
    ;

var ProfileEdit = React.createClass({
    displayName: 'ProfileEdit',
    mixins: [
        Reflux.ListenerMixin,
        DeepLinkedStateMixin,
    ],

    _onProfileChanged: function (profile) {
        this.setState({
            profile: profile
        })
    },

    _reset: function () {
        this.replaceState(this.getInitialState());
    },

    _submit: function () {
        ProfileActions.updateProfile({
            displayName: this.state.profile.displayName,
            email: this.state.profile.email,
            avatar: this.state.profile.avatar
        });
        this._reset();
    },

    getInitialState: function () {
        return {
            busy: !ProfileStore.isLoaded(),
            profile: ProfileStore.getProfile()
        };
    },

    componentDidMount: function () {
        this.listenTo(ProfileStore, this._onProfileChanged);
    },

    render: function () {
        return (
            <ContentPage title='Edit Profile' subTitle='Profile Information' icon='gi gi-user'>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={this._submit} onReset={this._reset} submitText='Update Profile'>
                            <Input type='text' label='Display Name' valueLink={this.linkState('profile.displayName')} />
                            <Input type='text' label='Email Address' valueLink={this.linkState('profile.email')} />
                            <Input type='text' label='Avatar' valueLink={this.linkState('profile.avatar')} />
                        </Form>
                    </Col>
                </Row>
            </ContentPage>
        );
    }
});

module.exports = ProfileEdit;