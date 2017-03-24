app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $ionicHistory, $state) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.deconnexion = function() {
      sessionStorage.clear();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.components');
    };


    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }



    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       Modifié le rayon' +
                    '       <br /> '+
                    '       <input type="range" name="volume" min="0" max="100" value="33">'+
                    '       <button class="button button-full" ng-click="showPopup()">Modifier</button>'+
                    '   </ion-content>' +
                    '</ion-popover-view>';


    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
});
