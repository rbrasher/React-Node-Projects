(function () {
  'use strict';

  angular
    .module('app')
    .factory('stateWatcherService', stateWatcherService);

  stateWatcherService.$inject = ['$log', '$rootScope', 'ENV'];

  /* @ngInject */
  function stateWatcherService($log, $rootScope, ENV) {

    if (ENV && ENV.DEBUG_STATE) {
      $rootScope.$on('$stateChangeStart', stateChangeStart);
      $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
      $rootScope.$on('$stateChangeError', stateChangeError);
      $rootScope.$on('$stateNotFound', stateNotFound);
    }

    var service = {};
    return service;

    ////////////////

    function stateChangeStart(event, toState, toParams, fromState, fromParams) {
      $log.log('state change start', event, toState, toParams, fromState, fromParams);
    }

    function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      $log.log('state change success', event, toState, toParams, fromState, fromParams);
    }

    function stateChangeError(event, toState, toParams, fromState, fromParams) {
      $log.log('state change error', event, toState, toParams, fromState, fromParams);
    }

    function stateNotFound(event, unfoundState, fromState, fromParams) {
      $log.log('state not found', event, unfoundState, fromState, fromParams);
    }
  }
})();
