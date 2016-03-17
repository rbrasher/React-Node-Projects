var Reflux = require('reflux')
    , _ = require('lodash')
    , Api = require('./../flux/api.js')
    ;

var ProjectStore = require('../stores/project-store')
    ;

var ProjectActions = require('../actions/project-actions')
    ;

var store = {
    loaded: false,
    pages: [],
    projectId: null
};

var PageStore = Reflux.createStore({

    _onAddPage: function (page) {
        //console.log("_onAddPage: " + page);
        try {
            var config = {
                path: '/project/' + store.projectId + '/pages',
                success: function (res) {
                    var p = store.pages;
                    p.push(_.defaults({id: res.id}, page));
                    store.pages = p;
                    ProjectActions.addPage.completed(p);
                    this.trigger(store.pages);
                }.bind(this),
                failure: function (res) {
                    console.log('API Call failed', res);
                    ProjectActions.addPage.failed(res);
                },
                always: function () {
                    ProjectActions.addPage.always();
                }
            };

            config.data = page;
            Api.post(config);
        } catch (err) {
            console.log('API Call Exception', err);
            ProjectActions.addPage.failed(err);
            ProjectActions.addPage.always();
        }
    },

    _onEditPage: function (page) {
        //console.log("_onEditPage: " + page);
        try {
            var config = {
                path: '/project/' + store.projectId + '/pages/' + page.id + '/content',
                success: function () {
                    var result = _.findIndex(store.pages, function (p) {
                        return p.id === page.id;
                    });

                    if (result >= 0) {
                        store.pages.splice(result, 1, page);
                    }
                    ProjectActions.editPage.completed(store.pages);
                    this.trigger(store.pages);
                }.bind(this),
                failure: function (res) {
                    console.log('API Call failed', res);
                    ProjectActions.editPage.failed(res);
                },
                always: function () {
                    ProjectActions.editPage.always();
                }
            };

            config.data = page.content;
            Api.put(config);
        } catch (err) {
            console.log('API Call Exception', err);
            ProjectActions.editPage.failed(err);
            ProjectActions.editPage.always();
        }
    },

    _onDeletePage: function (pageId) {
        //console.log("_onDeletePage: " + pageId);
        try {
            var config = {
                path: '/project/' + store.projectId + '/pages/' + pageId,
                success: function (res) {
                    var result = _.findIndex(store.pages, function (page) {
                        return page.id == pageId;
                    });

                    if (result >= 0) {
                        store.pages.splice(result, 1);
                        ProjectActions.deletePage.completed(res);
                    }
                }.bind(this),
                failure: function (err) {
                    console.log('API Delete Call Exception', err);
                    ProjectActions.deletePage.failed(err);
                },
                always: function () {
                    ProjectActions.deletePage.always();
                }
            };

            Api.del(config);
        } catch (err) {
            console.log('API Delete Call Exception', err);
            ProjectActions.deletePage.failed(err);
            ProjectActions.deletePage.always();
        }
    },

    _onReorderPages: function (projectId, pages) {
        //console.log("_onReorderPages: " + projectId + ", " + pages);
        store.projectId = projectId;
        try {
            var data = [];
            pages.map(function (page) {
                var id = page.id;
                if (!!id) {
                    data.push(id);
                }
            });

            const config = {
                path: '/project/' + store.projectId + '/pages',
                data: data,
                success: function (res) {
                    console.log('Reorder API Success', res);
                    ProjectActions.reorderPages.completed();
                },
                failure: function (err) {
                    console.log('Reorder API Failure', err);
                    ProjectActions.reorderPages.failed(err);
                },
                always: function () {
                    ProjectActions.reorderPages.always();
                }
            };

            Api.put(config);
        } catch (err) {
            console.log('Reorder API Failure', err);
            ProjectActions.reorderPages.failure(err);
            ProjectActions.reorderPages.always();
        }
    },

    _onRefreshPages: function (projectId) {
        //console.log("_onRefreshPages: " + projectId);
        if (store.projectId != projectId) {
            store.projectId = projectId;
            if (store.projectId) {
                try {
                    var config = {
                        path: '/project/' + store.projectId + '/pages',
                        success: function (res) {
                            var pages = [];

                            for (var key in res) {
                                var value = res[key];

                                pages.push(_.defaults({id: key}, value));
                            }

                            store.loaded = true;
                            store.pages = pages;
                            this.trigger(store.pages);
                        }.bind(this),
                        failure: function (res) {
                            console.log('API Call failed', res);
                        },
                        always: function () {
                        }
                    };

                    Api.read(config);
                } catch (err) {
                    console.log('API Call Exception', err);
                }
            } else {
                store.pages = [];
                this.trigger(store.pages);
            }
        }
    },

    _onProjectLoaded: function (project) {
        //console.log("_onProjectLoaded: " + project);
        this._onRefreshPages(project ? project.id : null);
    },

    init: function () {
        //console.log('init');
        this.listenTo(ProjectStore, this._onProjectLoaded);

        this.listenTo(ProjectActions.addPage, this._onAddPage);
        this.listenTo(ProjectActions.editPage, this._onEditPage);
        this.listenTo(ProjectActions.deletePage, this._onDeletePage);
        this.listenTo(ProjectActions.reorderPages, this._onReorderPages);
    },

    isLoaded: function () {
        return store.loaded;
    },

    getPages: function () {
        return store.pages;
    },

    getPage: function (id) {
        if (!id) {
            return null;
        }

        var result = _.findIndex(store.pages, function (page) {
            return page.id == id;
        });

        if (result >= 0) {
            return store.pages[result];
        } else {
            return null;
        }
    }
});

module.exports = PageStore;
