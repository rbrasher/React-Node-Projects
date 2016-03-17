(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name core.Filters.vimeoUrlFilter
   * @description vimeoUrlFilter filter
   */
  angular
    .module('app')
    .filter('vimeoUrlFilter', vimeoUrlFilter)
    .filter('vimeoThumbnailUrlFilter', vimeoThumbnailUrlFilter);

  vimeoUrlFilter.$inject = ['$sce'];
  function vimeoUrlFilter($sce) {
    return function (videoId) {
      return $sce.trustAsResourceUrl('http://player.vimeo.com/video/' + videoId);
    };
  }

  vimeoThumbnailUrlFilter.$inject = ['$sce'];
  function vimeoThumbnailUrlFilter($sce) {
    return function (videoId) {
      return $sce.trustAsResourceUrl('http://i.vimeocdn.com/video/' + videoId + '_200x150.jpg');
    };
  }
})();
