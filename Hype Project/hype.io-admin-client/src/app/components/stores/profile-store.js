var Reflux = require('reflux')
    , Firebase = require('firebase')
    , Api = require('./../flux/api.js')
    ;

var UserStore = require('./user-store.js')
    ;

var ProfileActions = require('../actions/profile-actions.js')
    ;

var _firebase = new Firebase('https://hype-io.firebaseio.com/')
    ;

var store = {
    loaded: false,
    profile: {
        email: '',
        avatar: '',
        displayName: ''
    }
};

var defaultEmail = '';

var Store = Reflux.createStore({

    _refreshProfileData: function () {
        //console.log("_refreshProfileData");
        var config = {
            path: '/profile',
            success: function (res) {
                store.loaded = true;
                store.profile = res;
                this.trigger(store.profile);
            }.bind(this),
            failure: function () {
                console.log('fail');
                store.loaded = true;
                store.profile = {
                    email: defaultEmail,
                    avatar: '',
                    displayName: defaultEmail
                };
                this._onCreateProfile(store.profile);
                //this.trigger(store.profile);
            }.bind(this),
            always: function () {
            }
        };
        Api.read(config);
    },

    setDefaultEmail: function(email) {
        if(defaultEmail === '') {
            defaultEmail = email;
        }
    },

    _onCreateProfile: function (profile) {
        //console.log("_onCreateProfile: " + profile);
        Api.post({
            path: '/profile',
            data: profile,
            success: function () {
                this._refreshProfileData();
            }.bind(this)
        });
    },

    _onUpdateProfile: function (profile) {
        //console.log("_onUpdateProfile: " + profile);
        Api.update({
            path: '/profile',
            data: profile,
            success: function () {
                this._refreshProfileData();
            }.bind(this)
        });
    },

    _onProfileChanged: function () {
        //console.log("_onProfileChanged");
        this._refreshProfileData();
    },

    _onChangePassword: function(data) {
        //console.log(data);

        _firebase.changePassword({
            email: data.email,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, function(error) {
            if(error) {
                ProfileActions.passwordChanged.failed(error);
            } else {
                ProfileActions.passwordChanged.completed();
            }
        });

    },

    init: function () {
        //console.log("init");
        this.listenTo(UserStore, this._onProfileChanged);
        if (UserStore.getUser().isLoggedIn) {
            this._refreshProfileData();
        }

        this.listenTo(ProfileActions.updateProfile, this._onUpdateProfile);
        this.listenTo(ProfileActions.passwordChanged, this._onChangePassword);
    },

    isLoaded: function () {
        return store.loaded;
    },

    getProfile: function () {
        return store.profile;
    }

});

module.exports = Store;
