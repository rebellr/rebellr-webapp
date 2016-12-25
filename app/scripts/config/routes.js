/**
 * Created by saketramdurbha on 12/24/16.
 */

angular.module('rebellrApp')
  .config(['$stateProvider', function ($stateProvider) {
    var indexState = {
      name: 'index',
      templateUrl: '/views/index.html',
      controller: 'IndexCtrl',
      url: ''
    };

    $stateProvider.state(indexState);
  }]);
