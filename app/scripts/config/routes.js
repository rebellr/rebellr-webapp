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

    var usersRegisterState = {
      name: 'register',
      templateUrl: '/views/users/register.html',
      controller: 'UsersRegisterCtrl',
      url: '/register'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(usersRegisterState);
  }]);
