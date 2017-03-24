app.controller('ComponentsCtrl', function ($ionicSideMenuDelegate ,$ionicHistory, $scope,$http,  $stateParams, ionicMaterialInk, $ionicPopup, $timeout, $state, $location) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    var userDetails = {
                        "username":"pierre.bouffier05@gmail.com"
                       }
    $scope.login = function() {
      var id = document.getElementById("id").value;
      var mdp = document.getElementById("mdp").value.toLowerCase();
     $http.get("http://thomasvieux.fr/Webservice/marker.php?id="+id+"&&mdp="+mdp, userDetails)
    .success (function(response){
        users = response;
        console.log(users.id);
        if(typeof users.id !== 'undefined')
        {

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.motion');
          $timeout(function() {
              //ionic.material.ink.displayEffect();
              ionicMaterialInk.displayEffect();
          }, 0);
          sessionStorage.IdUsers = users.id;
          sessionStorage.pickLinK = users.picLink;
          sessionStorage.nameName = users.name;
          document.getElementById('nomUtilisateur').innerHTML = "Mr. "+sessionStorage.nameName;
          console.log(sessionStorage.getItem("IdUsers"));
        }else{
          var alertPopup = $ionicPopup.alert({
              title: 'Connection echouer',
              template: 'Les identifiants sont incorrects'

            });
            $timeout(function() {
                //ionic.material.ink.displayEffect();
                ionicMaterialInk.displayEffect();
            }, 0);
        }

     })
     .error(function(response){
        console.log(response);
     });
    }

    $scope.inscription = function(){


      $state.go('app.inscription');
    }
});
