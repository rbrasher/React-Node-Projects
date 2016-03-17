(function () {
  'use strict';

  angular
    .module('app')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', 'ENV'];

  /* @ngInject */
  function dataService($http, ENV) {
    var promise;
    var service = {
      navigation: {},
      content: {},
      config: {name: 'Application Name', description: ''},

      fetch: fetch
    };

    return service;

    ////////////////

    function fetch() {
      var that = this;
      if (!promise) {
        promise = $http.get(ENV.DATA_PATH)
          .success(function (data) {
            that.navigation = data.navigation;
            that.content = data.content;
            that.config = data.config;
          });
      }
      return promise;
    }
  }
})();


