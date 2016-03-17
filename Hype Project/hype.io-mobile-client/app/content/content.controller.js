(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$scope', '$stateParams', 'contentService', 'utilService'];

  /* @ngInject */
  function ContentController($scope, $stateParams, contentService, utilService) {
    /* jshint validthis: true */
    var content = this;

    content.item = null;
    content.hasItems = utilService.hasItems;
    content.hasItem = hasItem;
    content.hasTitle = hasTitle;
    content.getIncludeFilename = getIncludeFilename;
    content.getIcon = getIcon;
    content.hasThumbnail = hasThumbnail;
    content.hasAuthor = hasAuthor;
    content.incrementUpvotes = incrementUpvotes;
    content.hasUpvotes = hasUpvotes;
    content.hasShares = hasShares;
    content.incrementShares = incrementShares;

    activate();

    ////////////////

    function activate() {
      var contentId = '';
      if ($stateParams && $stateParams.id) {
        contentId = $stateParams.id;

        /* Note: This approach requires the parent controller's ng-repeat to name the variable "navChild" */
      } else if ($scope && $scope.$parent && $scope.$parent.navChild && $scope.$parent.navChild.content) {
        contentId = $scope.$parent.navChild.content;

        /* Note: This approach requires the parent controller's ng-repeat to name the variable "navItem" */
      } else if ($scope && $scope.$parent && $scope.$parent.navItem && $scope.$parent.navItem.content) {
        contentId = $scope.$parent.navItem.content;
      }

      if (contentId) {
        contentService.fetch().then(function() {
          content.item = contentService.getByContentId(contentId);
        });
      }
    }

    function hasItem() {
      return content.item && hasTitle() && hasContentType();
    }

    function hasTitle() {
      return content.item && content.item.title && content.item.title.length > 0;
    }

    function hasContentType() {
      return content.item && content.item['content-type'] && content.item['content-type'].length > 0;
    }

    function getIncludeFilename() {
        var includeFilename = 'content/unknown.html';
        if (hasContentType()) {
            includeFilename = 'content/' + content.item['content-type'] + '.html';
        }

        return includeFilename;
    }

    function getIcon(contentType) {
      var type = contentType;

      switch(type) {
        case 'text/html':
          return 'ion-document';
        case 'video/youtube':
        case 'video/wistia':
        case 'video/vimeo':
        case 'video/quicktime':
        case 'video/mp4':
        case 'video/webm':
          return 'ion-videocamera';
        default:
          return '';
      }
    }

    function hasThumbnail() {
        return content.item && content.item.thumbnail;
    }

    function hasAuthor() {
      return content.item && content.item.author;
    }

    function incrementUpvotes() {
      var v;
      hasUpvotes();

      if(hasUpvotes) {
        v = content.item.upvotes;
      } else {
        v = 0;
      }

      v += 1;
      content.item.upvotes = v;
    }

    function hasUpvotes() {
      if(typeof content.item.upvotes === 'undefined' || typeof content.item.upvotes === isNaN()) {
        content.item.upvotes = 0;
      }
      return content.item && content.item.upvotes;
    }

    function incrementShares() {
      var v;
      hasShares();

      if(hasShares) {
        v = content.item.shares;
      } else {
        v = 0;
      }
      v += 1;
      content.item.shares = v;
    }

    function hasShares() {
      if(typeof content.item.shares === 'undefined' || typeof content.item.shares === isNaN()) {
        content.item.shares = 0;
      }
      return content.item && content.item.shares;
    }

  }
})();
