var Reflux = require('reflux');

var Actions = Reflux.createActions({
    'createProfile': {
        asyncResult: true,
        children: ['always']
    },
    'updateProfile': {
        asyncResult: true,
        children: ['always']
    },
    'passwordChanged': {
        asyncResult: true,
        children: ['always']
    }
});

module.exports = Actions;