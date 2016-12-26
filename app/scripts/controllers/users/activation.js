/**
 * Created by saketramdurbha on 12/25/16.
 */

angular.module('rebellrApp')
  .controller('UsersActivationCtrl', ['$scope', '$stateParams', '$http', 'httpConfig', 'dialogs', function ($scope, $stateParams, $http, httpConfig, dialogs) {
    $scope.activate = function () {
      var email = $stateParams.email;
      var activationToken = $stateParams.token;

      $http.post(httpConfig.getFullServerUrl() + '/account_activations', {
        email: email,
        activation_token: activationToken
      })
        .then(function successCallback() {
          var deferred = dialogs.alertTextContent('Account Activated!', 'Thank you for activating your account! You will now be redirected to the sign in page.');
          deferred.then(function () {
            // TODO: Change state to sign in
          });
        }, function errorCallback(response) {
          if (response.status === 401 || response.status === 403) {
            dialogs.errorAlert(response.data.error);
          } else {
            dialogs.networkErrorAlert();
          }
        });
    };
  }]);
