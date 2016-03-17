(function () {
  'use strict';

  //noinspection JSUnusedLocalSymbols
  angular
    .module('app', ['ionic'])
    .run(['$state', '$ionicPlatform', 'stateWatcherService', function ($state, $ionicPlatform, /*jshint unused:false */ stateWatcherService) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        // TODO: Determine the correct functionality here... while debugging, this is annoying
        //$state.go('list');
      });
    }]);
})();
