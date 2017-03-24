app.controller('InscriptionCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();


    $scope.inscription = function() {
      var prenom = document.getElementById("prenom").value;
      var nom = document.getElementById("nom").value;
      var ddn = document.getElementById("ddn").value;
      var email = document.getElementById("email").value;
      var mdp = document.getElementById("mdp").value;
      var mdp2 = document.getElementById("mdp2").value;
      console.log("http://thomasvieux.fr/Webservice/inscription.php?prenom="+prenom+"&&nom="+nom+"&&ddn="+ddn+"&&email="+email+"&&mdp="+mdp);
      if(mdp == mdp2)
      {
     $http.get("http://thomasvieux.fr/Webservice/inscription.php?prenom="+prenom+"&&nom="+nom+"&&ddn="+ddn+"&&email="+email+"&&mdp="+mdp, userDetails)
    .success (function(response){
      console.log("sa marche");
        var alertPopup = $ionicPopup.alert({
            title: 'Connection etablie',
            template: 'Bonjour '+users.name+''

          });

          $timeout(function() {
              //ionic.material.ink.displayEffect();
              ionicMaterialInk.displayEffect();
          }, 0);
      })
     .error(function(response){
        console.log("sa marche pas");
     });

    }
    else
    {
      console.log("sa marche encore moins");
    }
  }
});
