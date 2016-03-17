(function () {
  'use strict';

  angular
    .module('app')
    .controller('NavListController', NavListController);

  NavListController.$inject = ['dataService', 'utilService'];

  /* @ngInject */
  function NavListController(dataService, utilService) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = '';
    vm.navItems = [];
    vm.hasItems = utilService.hasItems;

    activate();

    ////////////////

    function activate() {
      dataService.fetch().then(function() {
        if (dataService.config.name) {
          vm.title = dataService.config.name;
        }

        if (dataService.navigation && utilService.hasItems(dataService.navigation)) {
          vm.navItems = angular.copy(dataService.navigation);
        }
      });
    }
  }
})();
