/**
 * Created by saket on 24/12/2016.
 */

angular.module('rebellrApp')
  .factory('User', ['$resource', 'httpConfig', function ($resource, httpConfig) {
    return $resource(httpConfig.getFullServerUrl + '/users/:userId', {userId: '@id'});
  }]);

angular.module('rebellrApp')
  .service('UserService', ['$state', '$http', 'httpConfig', 'dialogs', '$mdDialog', function ($state, $http, httpConfig, dialogs, $mdDialog) {
    this.signup = function (user) {
      $http({
        method: 'POST',
        url: httpConfig.getFullServerUrl() + '/users',
        data: {
          user: user
        }
      }).then(function successCallback(response) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(false)
            .title('Thanks!')
            .textContent('Thank you for signing up! Please check your email to activate your account.')
            .ok('Ok Ok')
        )
          .then(function() {
            $state.go('index');
          });
      }, function errorCallback(response) {
        dialogs.networkErrorAlert();
      });
    };
  }]);
