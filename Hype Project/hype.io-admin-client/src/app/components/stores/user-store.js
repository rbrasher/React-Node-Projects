var Reflux = require('reflux')
    , Firebase = require('firebase')
    , Api = require('./../flux/api.js')
    ;

var UserActions = require('../actions/user-actions.js')
    ;

var _firebase = new Firebase('https://hype-io.firebaseio.com/');

var store = {
    user: {
        token: '',
        isLoggedIn: false
    }
};

var Store = Reflux.createStore({

    _onLogin: function (user) {
        //console.log("_onLogin: " + user);
        try {
            _firebase.authWithPassword(user, function (error, authData) {
                //console.log("_firebase.authWithPassword: " + error + ", " + authData);
                if (error !== null) {
                    console.log(error);

                    store.user.isLoggedIn = false;
                    this.trigger(store.user);
                    UserActions.login.failed(error);
                    UserActions.login.always();
                //} else {
                //    // sucessful login
                //    store.user.isLoggedIn = true;
                //    store.user.token = authData.token;
                //    this.trigger(store.user);
                //    UserActions.login.completed();
                //    UserActions.login.always();
                }
            }.bind(this));
        } catch (err) {
            UserActions.login.failed(err);
            UserActions.login.always();
        }
    },

    _onLogout: function () {
        //console.log("_onLogout");
        _firebase.unauth();
    },

    init: function () {
        //console.log("init");
        this.listenTo(UserActions.login, this._onLogin);
        this.listenTo(UserActions.logout, this._onLogout);

        // Todo: do I need to call ref.OffAuth()?
        _firebase.onAuth(function (authData) {
            //console.log("_firebase.onAuth: " + authData);
            if (!authData) {
                store.user.token = '';
                store.user.isLoggedIn = false;
                this.trigger(store.user);
            } else {
                store.user.token = authData.token;
                store.user.isLoggedIn = true;
                this.trigger(store.user);
            }
        }.bind(this));

        //this.login({email: 'matt@innitech.com', password: '1nn1t3ch'});
    },

    getUser: function() {
        return store.user;
    }
});

module.exports = Store;
