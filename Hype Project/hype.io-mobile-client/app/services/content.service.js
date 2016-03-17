(function () {
  'use strict';

  angular
    .module('app')
    .factory('contentService', contentService);

  contentService.$inject = ['dataService'];

  /* @ngInject */
  function contentService(dataService) {
    var promise;
    var service = {
      list: [],
      fetch: fetch,
      getByPermalink: getByPermalink,
      getByContentId: getByContentId
    };

    return service;

    ////////////////

    function fetch() {
      var that = this;
      if (!promise) {
        promise = dataService.fetch().success(function () {
          that.list = dataService.content;
        })
      }
      return promise;
    }

    function getByPermalink(permalink) {
      var content;
      for (var id in dataService.content) {
        content = dataService.content[id];
        if (content && content.permalink && content.permalink === permalink) {
          break;
        } else {
          content = null;
        }
      }

      return content;
    }

    function getByContentId(contentId) {
      var content;
      for (var id in dataService.content) {
        if (id && id === contentId) {
          content = dataService.content[contentId];
          break;
        } else {
          content = null;
        }
      }

      return content;
    }
  }
})();
