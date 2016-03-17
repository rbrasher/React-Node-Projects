var Reflux = require('reflux');

var Actions = Reflux.createActions({
    'addPage': {
        asyncResult: true
    },
    'editPage': {
        asyncResult: true
    },
    'deletePage': {
        asyncResult: true
    }
});

module.exports = Actions;