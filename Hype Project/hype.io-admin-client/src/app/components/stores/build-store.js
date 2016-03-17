var Reflux = require('reflux')
    , _ = require('lodash')
    , Api = require('./../flux/api.js')
    ;

var ProjectStore = require('../stores/project-store')
    ;

var ProjectActions = require('../actions/project-actions')
    ;

var _defaultBuilds = {
    ios: {},
    android: {}
};

var store = {
    loaded: false,
    builds: _defaultBuilds,
    projectId: null
};

var Store = Reflux.createStore({

    _onEditBuild: function (platform, build) {
        //console.log("_onEditBuild: " + platform + ", " + build);
        try {
            var config = {
                path: '/project/' + store.projectId + '/build/' + platform,
                success: function () {
                    store.builds[platform] = build;
                    ProjectActions.editBuild.completed(store.builds);
                    this.trigger(store.builds);
                }.bind(this),
                failure: function (res) {
                    console.log('API Call failed', res);
                    ProjectActions.editBuild.failed(res);
                },
                always: function () {
                    ProjectActions.editBuild.always();
                }
            };

            config.data = build;
            Api.put(config);
        } catch (err) {
            console.log('API Call Exception', err);
            ProjectActions.editBuild.failed(err);
            ProjectActions.editBuild.always();
        }
    },

    _refreshBuilds: function (projectId) {
        //console.log("_onRefreshBuilds: " + projectId);
        if (store.projectId != projectId) {
            store.projectId = projectId;
            if (store.projectId) {
                try {
                    var config = {
                        path: '/project/' + store.projectId + '/build',
                        success: function (res) {
                            if (_.isEmpty(res)) {
                                res = _defaultBuilds;
                            }
                            store.loaded = true;
                            store.builds = res;
                            this.trigger(store.builds);
                        }.bind(this),
                        failure: function (res) {
                            console.log('API Call failed', res);
                            store.loaded = true;
                            store.builds = _defaultBuilds;
                            this.trigger(store.builds);
                        }.bind(this),
                        always: function () {
                        }
                    }
                    Api.read(config);
                } catch (err) {
                    console.log('API Call Exception', err);
                }
            } else {
                store.builds = {};
                this.trigger(store.builds);
            }
        }
    },

    _onProjectLoaded: function (project) {
        //console.log("_onProjectLoaded: " + project);
        this._refreshBuilds(project ? project.id : null);
    },

    init: function () {
        //console.log('init');
        this.listenTo(ProjectStore, this._onProjectLoaded);

        this.listenTo(ProjectActions.editBuild, this._onEditBuild);
    },

    isLoaded: function () {
        return store.loaded;
    },

    getBuilds: function () {
        return store.builds;
    },

    getBuild: function (platform) {
        if (!platform) {
            return null;
        }

        return store.builds[platform];
    }
});

module.exports = Store;
