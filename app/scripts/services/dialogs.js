/**
 * Created by saket on 24/12/2016.
 */

angular.module('rebellrApp')
  .service('dialogs', ['$mdDialog', function dialogsService($mdDialog) {
    this.networkErrorAlert = function (error) {
      console.error(error);
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('Network Error')
          .textContent('There has been an error in our code. Saketram Durbha takes the blame. Sorry about that.')
          .ariaLabel('Network Error')
          .ok('Ok Ok')
      );
    };
  }]);
