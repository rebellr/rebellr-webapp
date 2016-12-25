/**
 * Created by saketramdurbha on 12/25/16.
 */

/**
 * Created by saket on 24/12/2016.
 */

angular.module('rebellrApp')
  .factory('Session', ['$resource', 'httpConfig', function ($resource, httpConfig) {
    return $resource(httpConfig.getFullServerUrl + '/sessions/:userId', {userId: '@id'});
  }]);

angular.module('rebellrApp')
  .service('SessionService', ['$state', '$cookies', '$q', '$http', 'httpConfig', 'dialogs', function ($state, $cookies, $q, $http, httpConfig, dialogs) {
    this.getCurrentUser = function () {
      var deferred = $q.defer();

      $http.get(httpConfig.getFullServerUrl() + '/status')
        .then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback() {
          dialogs.networkErrorAlert();
          deferred.reject(null);
        });

      return deferred.promise;
    };

    this.signIn = function (email, password) {
      $http({
        method: 'POST',
        url: httpConfig.getFullServerUrl() + "/sessions",
        data: {
          session: {
            email: email,
            password: password
          }
        }
      })
        .then(function successCallback(response) {
          var authToken = response.data.auth_token;
          $cookies.put('auth_token', authToken);
          $http.defaults.headers.common.Authorization = 'Token token=' + $cookies.get('auth_token');
        }, function errorCallback(response) {
          if (response.status === 403) {
            dialogs.errorAlert(response.data.error);
          } else {
            dialogs.networkErrorAlert();
          }
        });
    };

    this.signOut = function() {
      $http.delete(httpConfig.getFullServerUrl() + '/sessions')
        .then(function successCallback() {
          $state.go('index');
        }, function errorCallback() {
          dialogs.networkErrorAlert();
        });
    };
  }]);
