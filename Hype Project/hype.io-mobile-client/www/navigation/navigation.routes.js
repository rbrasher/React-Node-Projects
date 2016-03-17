(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('nav', {
        url: '/nav',
        templateUrl: 'navigation/navigation.html',
        controller: 'NavListController as navigation'
      });
  }
})();
