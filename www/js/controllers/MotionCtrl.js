app.controller('MotionCtrl', function ($scope,$state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http) {
document.getElementById('nomUtilisateur').innerHTML = "Mr. "+ sessionStorage.nameName;
console.log(sessionStorage.pickLinK);
document.getElementById('photoUser').innerHTML = "<img src='http://dropzone.pierreb.tk/images/profile/"+sessionStorage.pickLinK+"' style='margin: 12px 0px 0px 21px' width='100px' class='circle'>";



   $scope.redirectMap = function(id, depotRetirMax, ville2) {
       tabVille = [];
     $http.get("http://thomasvieux.fr/Webservice/rechercheVille.php?ville="+ville2)
     .success (function(response){
       ville = response;
       var listTransport = ville.listTransport;
       console.log(ville);
       for(var num in listTransport)
       {
         let trajet = listTransport[num];
         console.log(trajet.id);
         tabVille.push(trajet.id);
       }
       console.log(tabVille);
       sessionStorage.idTrajet = tabVille;
       sessionStorage.depotRetirMax = parseFloat(depotRetirMax);
       sessionStorage.villeTrajet = ville2;
     //  sessionStorage.depotRetirMax =

       $state.go('app.map');
     });


   };

   $scope.newTrajet = function() {
     $state.go('app.newTrajet');
   }
   $scope.test = function() {
     console.log('laaaa');
     //$state.go('app.map', {'index': trajet});
   };
   console.log('contenu');
    var fab = document.getElementById('fab');


    //ionic.material.ink.displayEffect(); ionicMaterialMotion
    ionicMaterialInk.displayEffect();
});
