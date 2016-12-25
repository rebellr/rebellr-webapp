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

    var userSignupState = {
      name: 'signup',
      templateUrl: '/views/users/signup.html',
      controller: 'UsersSignupCtrl',
      url: '/signup'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(userSignupState);
  }]);
