var React = require('react')
    , Router = require('react-router')
    , Reflux = require('reflux')
    , Fonticon = require('../core/fonticon.jsx')
    ;

var ProfileStore = require('../stores/profile-store.js')
    ;

var UserActions = require('../actions/user-actions.js')
    ;


var SidebarProfile = React.createClass({
    displayName: 'SidebarProfile',
    mixins: [
        Router.Navigation,
        Reflux.ListenerMixin
    ],

    _onProfileChanged: function (profile) {
        this.setState({
            profile: profile
        });
    },

    _logout: function (e) {
        e.preventDefault;

        UserActions.logout();
    },

    _edit: function (e) {
        e.preventDefault();

        this.context.router.transitionTo('profile-edit');
    },

    _changePassword: function(e) {
        e.preventDefault();

        this.context.router.transitionTo('profile-change-password');
    },

    getInitialState: function () {
        return {
            profile: ProfileStore.getProfile()
        }
    },

    componentDidMount: function () {
        //console.log("componentDidMount");
        this.listenTo(ProfileStore, this._onProfileChanged);
    },

    render: function () {
        var profile = this.state.profile || {};

        return (
            <div className="sidebar-section sidebar-user clearfix sidebar-nav-mini-hide">
                <div className="sidebar-user-avatar">
                    <a href="page_ready_user_profile.html">
                        <img src={profile.avatar || 'images/default-user.jpg'} alt="avatar"/>
                    </a>
                </div>
                <div className="sidebar-user-name">{profile.displayName}</div>
                <div className="sidebar-user-links">
                    <a href="javascript:void(0)" onClick={this._edit} data-toggle="tooltip" data-placement="bottom"
                       title="Profile">
                        <Fonticon icon='user'/>
                    </a>
                    <a href="javascript:void(0)" onClick={this._changePassword} className="enable-tooltip" data-placement="bottom" title="Change Password">
                        <Fonticon icon='cogwheel'/>
                    </a>
                    {/* <Button bsStyle='link' onClick={this._logout} data-toggle='tooltip' data-placement='bottom' title='Logout'><Fonticon icon='exit' /></Button> */}
                    <a onClick={this._logout} data-toggle="tooltip" data-placement="bottom" title="Logout">
                        <Fonticon icon='exit'/>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = SidebarProfile;