/**
 * Created by saketramdurbha on 12/24/16.
 */

angular.module('rebellrApp')
  .controller('UsersRegisterCtrl', ['$scope', '$log', '$http', 'httpConfig', 'UserService', 'dialogs', function ($scope, $log, $http, httpConfig, UserService, dialogs) {
    $scope.schools = [];

    $scope.register = function () {
      $scope.user.school_id = $scope.school.id;

      UserService.register($scope.user);
    };

    $scope.onEmailChange = function(email) {
      $scope.school = null;
      $scope.schoolSearchText = "";

      if (!$scope.usersRegisterForm.email.$valid)
        return;

      var index = email.indexOf('@');
      var domain = email.substring(index + 1, email.length);

      $http({
        method: 'GET',
        url: httpConfig.getFullServerUrl() + "/schools/domains/" + domain
      }).then(function successCallback(response) {
        $scope.schools = response.data;
      }, function errorCallback(response) {
        dialogs.networkErrorAlert(response);
      });
    };

    $scope.querySearch = function (query) {
      return query ? $scope.schools.filter($scope.createFilterFor(query)) : $scope.schools;
    };

    $scope.createFilterFor = function(domain) {
      var lowercaseQuery = angular.lowercase(domain);

      return function filterFn(school) {
        return (angular.lowercase(school.name).indexOf(lowercaseQuery) === 0);
      };
    };
  }]);
