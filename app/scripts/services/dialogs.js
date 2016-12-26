/**
 * Created by saket on 24/12/2016.
 */

angular.module('rebellrApp')
  .service('dialogs', ['$mdDialog', function dialogsService($mdDialog) {
    this.networkErrorAlert = function (error) {
      var content = error ? error : 'There has been an error in our code. Saketram Durbha takes the blame. Sorry about that.';
      return $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('Network Error')
          .textContent(content)
          .ariaLabel('Network Error')
          .ok('Ok Ok')
      );
    };

    this.errorAlert = function (errorDescription) {
      return $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('There has been an error')
          .textContent(errorDescription)
          .ariaLabel('Error')
          .ok('Ok Ok')
      );
    };

    this.alertTextContent = function(title, content) {
      return $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title(title)
          .textContent(content)
          .ariaLabel(title)
          .ok('Ok Ok')
      );
    };
  }]);
