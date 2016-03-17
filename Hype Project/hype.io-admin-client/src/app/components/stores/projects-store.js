var Reflux = require('reflux')
    , _ = require('lodash')
    , Api = require('./../flux/api.js')
    ;

var ProjectActions = require('./../actions/project-actions.js')
    ;

var ProfileStore = require('./profile-store.js')
    ;

var store = {
    loaded: false,
    projects: []
};

var Store = Reflux.createStore({

    _onProfileChanged: function () {
        //console.log("_onProfileChanged");
        this._refreshProjects();
    },

    _refreshProjects: function () {
        //console.log("_refreshProjects");
        var config = {
            path: '/project',
            success: function (res) {
                var projects = [];

                for (var key in res) {
                    var value = res[key];

                    projects.push(_.defaults({id: key}, value));
                }
                store.loaded = true;
                store.projects = projects;
                this.trigger(store.projects);
            }.bind(this),
            failure: function (res) {
                console.log(res);

                store.loaded = true;
                store.projects = [];
                this.trigger(store.projects);
            }.bind(this),
            always: function () {
            }
        };

        Api.read(config);
    },

    _onAddProject: function (project, callbacks) {
        //console.log("_onAddProject: " + id);
        var cb = callbacks || {};

        var config = {
            path: '/project',
            data: project,
            success: function (res) {
                var newProject = _.defaults(res, project);

                store.projects.push(newProject);

                this.trigger(store.projects);

                //this._refreshProjects();

                if (cb.success) {
                    cb.success(newProject);
                }
            }.bind(this),
            failure: function () {
                console.log('fail');

                if (cb.failure) {
                    cb.failure();
                }
            },
            always: cb.always
        };

        Api.create(config);
    },

    _onDeleteProject: function (id, callbacks) {
        //console.log("_onDeleteProject: " + id);
        var cb = callbacks || {};

        var config = {
            path: '/project/' + id,
            success: function (res) {
                this._refreshProjects();

                if (cb.success) {
                    cb.success(res)
                }
            }.bind(this),
            failure: cb.failure,
            always: cb.always
        };

        Api.del(config);
    },

    init: function () {
        //console.log("init");
        this.listenTo(ProfileStore, this._onProfileChanged);

        this.listenTo(ProjectActions.addProject, this._onAddProject);
        this.listenTo(ProjectActions.deleteProject, this._onDeleteProject);
    },

    isLoaded: function() {
        return store.loaded;
    },

    getProjects: function () {
        return store.projects;
    },

    getProject: function (id) {
        if (!id) {
            return null;
        }

        var result = _.findIndex(store.projects, function (project) {
            return project.id == id;
        });

        if (result >= 0) {
            return store.projects[result];
        } else {
            return null;
        }
    }
});

module.exports = Store;