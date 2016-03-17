(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name core.Filters.wistiaUrlFilter
   * @description wistiaUrlFilter filter
   */
  angular
    .module('app')
    .filter('wistiaUrlFilter', wistiaUrlFilter);

  wistiaUrlFilter.$inject = ['$sce'];
  function wistiaUrlFilter($sce) {
    return function (videoId) {
      return $sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + videoId);
    };
  }
})();
