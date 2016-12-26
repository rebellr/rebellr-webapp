/**
 * Created by saketramdurbha on 12/26/16.
 */

angular.module('rebellrApp')
  .controller('SignInCtrl', ['$scope', '$http', 'httpConfig', 'SessionService', function ($scope, $http, httpConfig, SessionService) {
    $scope.signIn = function () {
      SessionService.signIn($scope.user.email, $scope.user.password);
    };
  }]);
