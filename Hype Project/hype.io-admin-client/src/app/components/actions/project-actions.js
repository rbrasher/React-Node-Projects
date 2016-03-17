var Reflux = require('reflux')
    ;

var Actions = Reflux.createActions({
    'addProject': {
        asyncResult: true,
        children: ['always']
    },
    'editProject': {
        asyncResult: true,
        children: ['always']
    },
    'deleteProject': {
        asyncResult: true,
        children: ['always']
    },
    'setActiveProject': {
        asyncResult: true,
        children: ['always']
    },


    'addPage': {
        asyncResult: true,
        children: ['always']
    },
    'editPage': {
        asyncResult: true,
        children: ['always']
    },
    'deletePage': {
        asyncResult: true,
        children: ['always']
    },
    'reorderPages': {
        asyncResult: true,
        children: ['always']
    },


    'editBuild': {
        asyncResult: true,
        children: ['always']
    }
});

module.exports = Actions;