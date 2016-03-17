var Reflux = require('reflux')
    , _ = require('lodash')
    , Api = require('./../flux/api.js')
    ;

var ProjectActions = require('./../actions/project-actions.js');

var ProjectsStore = require('./projects-store.js');

var store = {
    loaded: false,
    projectId: "",
    project: {}
};

var Store = Reflux.createStore({

    _setActiveProject: function (projectId) {
        //console.log("_setActiveProject: " + projectId);
        if (!store.loaded || store.projectId != projectId) {
            store.projectId = projectId;
            if (ProjectsStore.isLoaded()) {
                store.project = ProjectsStore.getProject(projectId);
                store.loaded = true;
                this.trigger(store.project);
            }
        }
    },

    _onSetActiveProject: function (projectId) {
        //console.log("_onSetActiveProject: " + projectId);
        this._setActiveProject(projectId);
    },

    _onProjectsLoaded: function () {
        //console.log("_onProjectsLoaded");
        this._setActiveProject(store.projectId);
    },

    _onEditProject: function (project) {
        try {
            var config = {
                path: '/project/' + store.projectId,
                success: function () {
                    ProjectActions.editProject.completed(store.project);
                    this.trigger(store.project);
                }.bind(this),
                failure: function (res) {
                    console.log('API Call failed', res);
                    ProjectActions.editProject.failed(res);
                },
                always: function () {
                    ProjectActions.editProject.always();
                }
            };

            config.data = project;
            Api.put(config);
        } catch (err) {
            console.log('API Call Exception', err);
            ProjectActions.editProject.failed(err);
            ProjectActions.editProject.always();
        }
    },

    _onDeleteProject: function (projectId) {
        //console.log("_onDeleteProject: " + projectId)
        if (store.projectId == projectId) {
            this._setActiveProject(null);
        }
    },

    init: function () {
        //console.log("init");
        this.listenTo(ProjectsStore, this._onProjectsLoaded);

        this.listenTo(ProjectActions.setActiveProject, this._onSetActiveProject);
        this.listenTo(ProjectActions.deleteProject, this._onDeleteProject);
        this.listenTo(ProjectActions.editProject, this._onEditProject);
    },

    isLoaded: function () {
        return store.loaded;
    },

    getProject: function () {
        return store.project;
    }
});

module.exports = Store;