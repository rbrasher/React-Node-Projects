(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('content', {
        url: '/content/:id',
        templateUrl: 'content/content.html',
        controller: 'ContentController as content'
      });
  }
})();
