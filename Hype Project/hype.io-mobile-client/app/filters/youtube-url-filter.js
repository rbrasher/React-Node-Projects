(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name core.Filters.youtubeUrlFilter
   * @description youtubeUrlFilter filter
   */
  angular
    .module('app')
    .filter('youtubeUrlFilter', youtubeUrlFilter)
    .filter('youtubeThumbnailUrlFilter', youtubeThumbnailUrlFilter);

  youtubeUrlFilter.$inject = ['$sce'];
  function youtubeUrlFilter($sce) {
    return function (youtubeId) {
      return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + youtubeId + '?rel=0&controls=0&showinfo=0');
    };
  }

  youtubeThumbnailUrlFilter.$inject = ['$sce'];
  function youtubeThumbnailUrlFilter($sce) {
    return function (videoId) {
      return $sce.trustAsResourceUrl('http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg');
    };
  }
})();
