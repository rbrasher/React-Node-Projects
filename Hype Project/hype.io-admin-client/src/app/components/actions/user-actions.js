var Reflux = require('reflux');

var Actions = Reflux.createActions({
    'login': {
        asyncResult: true,
        children: ['always']
    },
    'logout': {
        asyncResult: true,
        children: ['always']
    }
});

module.exports = Actions;