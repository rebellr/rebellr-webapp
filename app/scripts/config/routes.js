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

    var usersActivationState = {
      name: 'activation',
      templateUrl: '/views/users/activation.html',
      controller: 'UsersActivationCtrl',
      url: '/account_activations/:token/edit?email'
    };

    var signInState = {
      name: 'signIn',
      templateUrl: '/views/sessions/signin.html',
      controller: 'SignInCtrl',
      url: '/signin'
    };

    $stateProvider.state(indexState);
    $stateProvider.state(usersRegisterState);
    $stateProvider.state(usersActivationState);
    $stateProvider.state(signInState);
  }]);
