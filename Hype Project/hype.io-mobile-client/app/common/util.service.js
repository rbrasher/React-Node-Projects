(function () {
  'use strict';

  angular
    .module('app')
    .factory('utilService', utilService);

  utilService.$inject = [];

  /* @ngInject */
  function utilService() {
    var service = {
      hasChildren: hasChildren,
      hasItems: hasItems,
      shortenString: shortenString
    };

    return service;

    ////////////////

    function hasChildren(obj, propertyNames) {
      if (undefined === obj || null === obj) {
        return false;
      }

      if (typeof('string') === typeof(obj)) {
        return false;
      }

      var propertyName = '';
      if (undefined === propertyNames || null === propertyNames) {
        // Check if **any** children exist
        for (propertyName in obj) {
          if (obj.hasOwnProperty(propertyName)) {
            return true;
          }
        }

        return false;
      }

      if (!Array.isArray(propertyNames)) {
        return obj.hasOwnProperty(propertyNames);
      }

      var failed = false;
      var segmentObj = obj;
      for (var i = 0; i < propertyNames.length; i++) {
        propertyName = propertyNames[i];
        if (undefined !== segmentObj && null !== segmentObj && segmentObj.hasOwnProperty(propertyName)) {
          segmentObj = obj[propertyName];
        } else {
          failed = true;
          break;
        }
      }

      return !failed;
    }

    function hasItems(array) {
      return array && Array.isArray(array) && array.length > 0;
    }

    function shortenString(stringValue, shortLength) {
      if (undefined === stringValue || null === stringValue) {
        return '';
      }

      if (undefined === shortLength || isNaN(shortLength)) {
        shortLength = 30;
      }

      if (shortLength < 1) {
        shortLength = 1;
      }

      return stringValue && stringValue.length > shortLength ? stringValue.substr(0, (shortLength - 1)) + '…' : stringValue;
    }
  }
})();
