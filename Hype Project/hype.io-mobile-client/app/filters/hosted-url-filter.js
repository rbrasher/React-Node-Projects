(function () {
  'use strict';

  angular
    .module('app')
    .filter('hostedUrlFilter', hostedUrlFilter);

  hostedUrlFilter.$inject = ['$sce'];
  function hostedUrlFilter($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  }
})();
