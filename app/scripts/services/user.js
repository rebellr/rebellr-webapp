/**
 * Created by saket on 24/12/2016.
 */

angular.module('rebellrApp')
  .factory('User', ['$resource', 'httpConfig', function ($resource, httpConfig) {
    return $resource(httpConfig.getFullServerUrl + '/users/:userId', {userId: '@id'});
  }]);

angular.module('rebellrApp')
  .service('UserService', ['$http', 'httpConfig', 'dialogs', function ($http, httpConfig, dialogs) {
    this.signup = function (user) {
      $http({
        method: 'POST',
        url: httpConfig.getFullServerUrl() + '/users',
        data: user
      }).then(function successCallback(response) {

      }, function errorCallback(response) {
        dialogs.networkErrorAlert();
      });
    };
  }]);
